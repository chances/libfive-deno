// deno-lint-ignore-file
import { Pointer, FnPointer, StructPointer } from "./safe-ffi.ts";

export namespace five {
  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L31 */
  export type $__u_char = number;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L32 */
  export type $__u_short = number;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L33 */
  export type $__u_int = number;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L34 */
  export type $__u_long = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L37 */
  export type $__int8_t = number;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L38 */
  export type $__uint8_t = number;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L39 */
  export type $__int16_t = number;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L40 */
  export type $__uint16_t = number;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L41 */
  export type $__int32_t = number;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L42 */
  export type $__uint32_t = number;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L44 */
  export type $__int64_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L45 */
  export type $__uint64_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L52 */
  export type $__int_least8_t = five.$__int8_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L53 */
  export type $__uint_least8_t = five.$__uint8_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L54 */
  export type $__int_least16_t = five.$__int16_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L55 */
  export type $__uint_least16_t = five.$__uint16_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L56 */
  export type $__int_least32_t = five.$__int32_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L57 */
  export type $__uint_least32_t = five.$__uint32_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L58 */
  export type $__int_least64_t = five.$__int64_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L59 */
  export type $__uint_least64_t = five.$__uint64_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L63 */
  export type $__quad_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L64 */
  export type $__u_quad_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L72 */
  export type $__intmax_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L73 */
  export type $__uintmax_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L145 */
  export type $__dev_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L146 */
  export type $__uid_t = number;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L147 */
  export type $__gid_t = number;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L148 */
  export type $__ino_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L149 */
  export type $__ino64_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L150 */
  export type $__mode_t = number;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L151 */
  export type $__nlink_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L152 */
  export type $__off_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L153 */
  export type $__off64_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L154 */
  export type $__pid_t = number;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L155 */
  export type $__fsid_t = StructPointer<"$__fsid_t">;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L156 */
  export type $__clock_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L157 */
  export type $__rlim_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L158 */
  export type $__rlim64_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L159 */
  export type $__id_t = number;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L160 */
  export type $__time_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L161 */
  export type $__useconds_t = number;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L162 */
  export type $__suseconds_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L163 */
  export type $__suseconds64_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L165 */
  export type $__daddr_t = number;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L166 */
  export type $__key_t = number;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L169 */
  export type $__clockid_t = number;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L172 */
  export type $__timer_t = Pointer<"$__timer_t">;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L175 */
  export type $__blksize_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L180 */
  export type $__blkcnt_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L181 */
  export type $__blkcnt64_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L184 */
  export type $__fsblkcnt_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L185 */
  export type $__fsblkcnt64_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L188 */
  export type $__fsfilcnt_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L189 */
  export type $__fsfilcnt64_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L192 */
  export type $__fsword_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L194 */
  export type $__ssize_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L197 */
  export type $__syscall_slong_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L199 */
  export type $__syscall_ulong_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L203 */
  export type $__loff_t = five.$__off64_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L204 */
  export type $__caddr_t = Pointer<"$__caddr_t">;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L207 */
  export type $__intptr_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L210 */
  export type $__socklen_t = number;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/types.h#L215 */
  export type $__sig_atomic_t = number;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/stdint-intn.h#L24 */
  export type $int8_t = five.$__int8_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/stdint-intn.h#L25 */
  export type $int16_t = five.$__int16_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/stdint-intn.h#L26 */
  export type $int32_t = five.$__int32_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/stdint-intn.h#L27 */
  export type $int64_t = five.$__int64_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/stdint-uintn.h#L24 */
  export type $uint8_t = five.$__uint8_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/stdint-uintn.h#L25 */
  export type $uint16_t = five.$__uint16_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/stdint-uintn.h#L26 */
  export type $uint32_t = five.$__uint32_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includebits/stdint-uintn.h#L27 */
  export type $uint64_t = five.$__uint64_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includestdint.h#L43 */
  export type $int_least8_t = five.$__int_least8_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includestdint.h#L44 */
  export type $int_least16_t = five.$__int_least16_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includestdint.h#L45 */
  export type $int_least32_t = five.$__int_least32_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includestdint.h#L46 */
  export type $int_least64_t = five.$__int_least64_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includestdint.h#L49 */
  export type $uint_least8_t = five.$__uint_least8_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includestdint.h#L50 */
  export type $uint_least16_t = five.$__uint_least16_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includestdint.h#L51 */
  export type $uint_least32_t = five.$__uint_least32_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includestdint.h#L52 */
  export type $uint_least64_t = five.$__uint_least64_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includestdint.h#L58 */
  export type $int_fast8_t = number;

  /** https://github.com/libfive/libfive/blob/master/libfive/includestdint.h#L60 */
  export type $int_fast16_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includestdint.h#L61 */
  export type $int_fast32_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includestdint.h#L62 */
  export type $int_fast64_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includestdint.h#L71 */
  export type $uint_fast8_t = number;

  /** https://github.com/libfive/libfive/blob/master/libfive/includestdint.h#L73 */
  export type $uint_fast16_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includestdint.h#L74 */
  export type $uint_fast32_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includestdint.h#L75 */
  export type $uint_fast64_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includestdint.h#L87 */
  export type $intptr_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includestdint.h#L90 */
  export type $uintptr_t = bigint;

  /** https://github.com/libfive/libfive/blob/master/libfive/includestdint.h#L101 */
  export type $intmax_t = five.$__intmax_t;

  /** https://github.com/libfive/libfive/blob/master/libfive/includestdint.h#L102 */
  export type $uintmax_t = five.$__uintmax_t;

  /** /data/subprojects/libfive/libfive/include/libfive.h#L26 */
  export type interval = StructPointer<"libfive_interval">;

  /** /data/subprojects/libfive/libfive/include/libfive.h#L31 */
  export type region2 = StructPointer<"libfive_region2">;

  /** /data/subprojects/libfive/libfive/include/libfive.h#L36 */
  export type region3 = StructPointer<"libfive_region3">;

  /** /data/subprojects/libfive/libfive/include/libfive.h#L41 */
  export type vec2 = StructPointer<"libfive_vec2">;

  /** /data/subprojects/libfive/libfive/include/libfive.h#L46 */
  export type vec3 = StructPointer<"libfive_vec3">;

  /** /data/subprojects/libfive/libfive/include/libfive.h#L51 */
  export type vec4 = StructPointer<"libfive_vec4">;

  /** /data/subprojects/libfive/libfive/include/libfive.h#L57 */
  export type tri = StructPointer<"libfive_tri">;

  /** /data/subprojects/libfive/libfive/include/libfive.h#L66 */
  export type contour = StructPointer<"libfive_contour">;

  /** /data/subprojects/libfive/libfive/include/libfive.h#L75 */
  export type contours = StructPointer<"libfive_contours">;

  /** /data/subprojects/libfive/libfive/include/libfive.h#L84 */
  export type contour3 = StructPointer<"libfive_contour3">;

  /** /data/subprojects/libfive/libfive/include/libfive.h#L93 */
  export type contours3 = StructPointer<"libfive_contours3">;

  /** /data/subprojects/libfive/libfive/include/libfive.h#L104 */
  export type mesh = StructPointer<"libfive_mesh">;

  /** /data/subprojects/libfive/libfive/include/libfive.h#L118 */
  export type mesh_coords = StructPointer<"libfive_mesh_coords">;

  /** /data/subprojects/libfive/libfive/include/libfive.h#L128 */
  export type pixels = StructPointer<"libfive_pixels">;

  /** /data/subprojects/libfive/libfive/include/libfive.h#L178 */
  export type vars = StructPointer<"libfive_vars">;

  /** /data/subprojects/libfive/libfive/include/libfive.h#L187 */
  export type tree_ = StructPointer<"tree_">;

  /** /data/subprojects/libfive/libfive/include/libfive.h#L188 */
  export type tree = Pointer<"tree">;

  /** /data/subprojects/libfive/libfive/include/libfive.h#L190 */
  export type evaluator_ = StructPointer<"evaluator_">;

  /** /data/subprojects/libfive/libfive/include/libfive.h#L191 */
  export type evaluator = Pointer<"evaluator">;





  export declare function $$close(): void;
}
