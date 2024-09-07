import { assert } from "@std/assert";
import { readAll, writeAll } from "@std/io";

interface Reader {
  lines: string[];
  line: string;
  offset: number;
  advance(offset: number): number;
}

// See https://github.com/libfive/libfive/blob/master/libfive/stdlib/parse.py
export class Declaration {
  constructor(
    public readonly name: string,
    public readonly version: string | null,
    public readonly docs: string,
    public readonly args: Argument[],
    public readonly rawName: string | null
  ) {}

  /**
   * Parses a single declaration.
   *
   * @note This function continues to read lines from `stream` if the declaration spans multiple lines.
   **/
  static parse(line: string, reader: Reader): Declaration {
    const pieces = line.split(" ").slice(1);
    let name: string | string[] = pieces[0].split("(")[0];
    let rest = pieces.length > 1 ? pieces.slice(1, pieces.length - 1).split("(").slice(1) : "";
    let version: string | null = null;
    let args: Argument[] = [];
    let rawName: string | null = null;

    if (name.includes("__")) {
      name = name.split("__")[0];
      version = name.split("__")[1];
    }

    if (name.startsWith("_")) {
      rawName = name;
      name = name.slice(1);
    }

    let doc = "";
    if (rest.length && rest.endsWith(");"))
      for (const arg of rest.split(")")[0].split(",")) args.push(Argument.parse(arg.trim()));
    else {
      reader.advance(1);
      while (true) {
        const line = reader.line;
        if (line.trim().length === 0)
          throw new Error("Expected remaining arguments in argument list!");
        if (line.startsWith("// "))
          doc += `${line.slice(3)}\n`;
        else for (const arg of line.split(")")[0].split(","))
          args.push(Argument.parse(arg.trim()));

        if (line.endsWith(");")) break;
        else reader.advance(1);
      }
    }

    if (args.some(arg => arg.name === name)) throw new Error(`Argument shadows function name in ${name}.`);

    return new Declaration(name, version, doc.trim(), args, rawName);
  }
}

export class Argument {
  constructor(
    public readonly name: string,
    public readonly type: string,
    public readonly defaultValue: string | null = null
  ) {}

  /** Parses a single argument. */
  static parse(arg: string): Argument {
    const pieces = arg.split(" ");
    const type = pieces.slice(0, pieces.length - 1).join(" ");
    const name = pieces[pieces.length - 1];

    if (name.includes("__")) return new Argument(name.split('__')[0], type, name.split('__')[1]);
    return new Argument(name.split('__')[0], type);
  }
}

export class Module {
  constructor(public readonly shapes: Declaration[] = [], public readonly aliases: Alias[] = []) {}
}

export class Alias {
  constructor(public readonly name: string, public readonly target: string) {}

  /** Parses a declaration of the form `LIBFIVE_ALIAS(name, target)`. */
  static parse(alias: string): Alias {
    const [name, target] = alias.split("(")[1].split(")")[0].split(",");
    return new Alias(name.trim(), target.trim());
  }
}

/** Parses a declaration of the form `LIBFIVE_SECTION(name)`. */
function parseSection(s: string) {
  return s.split("(")[1].split(")")[0].trim();
}

export type Module = {};

const decoder = new TextDecoder();

/** Parses `libfive_stdlib.h`, based on idiosyncratic conventions. */
// See https://github.com/libfive/libfive/blob/302553e6aa6ca3cb13b2a149f57b6182ce2406dd/libfive/stdlib/parse.py#L75
export async function parse(file: Deno.FsFile) {
  const size = (await file.stat()).size;
  let section: string | null = null;
  const modules = new Map<string, Module>();
  await file.seek(0, Deno.SeekMode.Start);

  const lines = decoder.decode(await readAll(file)).split("\n").map(line => line.trim()).filter(line => line.length);
  for (let lineNumber = 0; lineNumber < lines.length; lineNumber += 1) {
    const line = lines[lineNumber];
    if (line.startsWith("LIBFIVE_SECTION")) {
      modules.set(section = parseSection(line), new Module());
    } else if (line.startsWith("LIBFIVE_STDLIB"))
      modules.get(section).shapes.push(Declaration.parse(line, {
        lines: lines.slice(lineNumber),
        get line() { return lines[lineNumber]; },
        get offset() { return lineNumber; },
        advance(offset: number) { lineNumber += offset; }
      }));
    else if (line.startsWith("LIBFIVE_ALIAS"))
      modules.get(section).aliases.push(Alias.parse(line));
  }

  return modules;
}

if (import.meta.main) {
  let stdLibFile = await Deno.open("subprojects/libfive/libfive/stdlib/libfive_stdlib.h", { read: true });
  const stdLib = await parse(stdLibFile);
  stdLibFile.close();

  const modules = {} as Record<string, Module>;
  for (const section of stdLib.keys()) modules[section] = stdLib.get(section);
  stdLibFile = await Deno.open("include/libfive-stdlib.json", { create: true, write: true });
  await writeAll(stdLibFile, new TextEncoder().encode(JSON.stringify(modules)));
  stdLibFile.close();

  // TODO: Massage this JSON such that it's ingestible by ffigen

  Deno.exit();
};
