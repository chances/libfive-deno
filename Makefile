ifdef OS
  OS := Windows
  ARCH := $(PROCESSOR_ARCHITECTURE)
  SOURCES := $(wildcard **/*.ts)
else
  OS := $(shell uname -s)
  ARCH := $(shell uname -m)
ifeq ($(OS),Darwin)
  SED := gsed
else
  SED := sed
endif
  SOURCES := $(shell find source -name '*.ts')
endif

ifeq (${OS},Darwin)
  LIBFIVE_ARTIFACTS += $(shell find subprojects/libfive/build -name libfive*.dylib)
  SYMBOL_LIST_SOURCES += $(LIBFIVE_ARTIFACTS)
else ifeq (${OS},Linux)
  LIBFIVE_ARTIFACTS += $(shell find subprojects/libfive/build -name libfive*.so)
  SYMBOL_LIST_SOURCES += $(LIBFIVE_ARTIFACTS)
else ifeq (${OS},Windows)
  LIBFIVE_ARTIFACTS += stdlib/libfive-stdlib.dll src/libfive.dll src/libpng*.dll src/zlib*.dll
  SYMBOL_LIST_SOURCES += bin/libfive-stdlib.dll bin/libfive.dll
else
  $(error Unsupported target platform: $(OS))
endif

.DEFAULT_GOAL = all

all: libfive $(SOURCES)
# TODO: dub build --root=examples/csg
# See https://deno.land/x/ffigen@v0.2.1#extract-definitions-from-c_libh
	deno task build

# Generate Bindings
gen: libfive include/libfive.json include/libfive_symbols.txt include/libfive-stdlib.json
	@deno run -A https://deno.land/x/ffigen/cli.ts --lib-name five --lib-prefix libfive_ --definitions include/libfive.json --symbols include/libfive_symbols.txt --headers "https://github.com/libfive/libfive/blob/master/libfive/include"
.PHONY: gen

include/libfive.json: libfive
# TODO: Detect whether Docker is installed. Error if it isn't.
	@docker run -v $(shell pwd):/data glebbash/deno-ffigen-c2ffi /data/subprojects/libfive/libfive/include/libfive.h > include/libfive.json

include/libfive-stdlib.json: libfive
	@deno run --allow-read=subprojects/libfive/ --allow-write=include/ gen.ts

# TODO: bin/$(SYMBOL_LISTS): $(SYMBOL_LIST_SOURCES)
include/libfive_symbols.txt: libfive
	@mkdir -p include
ifeq (${OS},Darwin)
	@nm -agU bin/libfive.dylib > $@
else
	@readelf -Ws --dyn-syms bin/libfive.so > $@
endif

# Subprojects
libfive: $(LIBFIVE_ARTIFACTS)
.PHONY: libfive
subprojects/libfive:
	git submodule update --init --recursive

subprojects/libfive/build/libfive/src/Makefile: subprojects/libfive.Makefile subprojects/libfive
	@make -C subprojects -f libfive.Makefile

# TODO: Add checks for mac OS ARM artifacts
# See https://makefiletutorial.com#multiple-targets
$(LIBFIVE_ARTIFACTS): subprojects/libfive/build/libfive/src/Makefile
ifneq (${OS},Windows)
	@mkdir -p bin
	@cp $@ bin
else
	@if not exist bin mkdir bin
	@xcopy /Y .\\subprojects\\libfive\\build\\libfive\\$@ bin
endif
.PHONY: $(LIBFIVE_ARTIFACTS)

# Documentation
docs/index.html: $(SOURCES)
# See https://docs.deno.com/runtime/reference/cli/documentation_generator/#html-output
	@deno doc --html --name="libfive for Deno" lib.ts

docs: docs/index.html
.PHONY: docs

# Cleanup
clean: clean-docs
	@rm -rf bin
	@rm -rf include
.PHONY: clean

clean-docs:
	@echo "Cleaning generated documentation..."
	@rm -f docs.json
	@rm -f docs/sitemap.xml docs/file_hashes.json
	@rm -rf `find docs -name '*.html'`
.PHONY: clean-docs
