/// License: MPL-2.0
/// See_Also: <a href="https://github.com/libfive/libfive/blob/master/libfive/include/libfive/tree/opcode.hpp">libfive/include/libfive/tree/opcode.hpp</a>
import stdlib;

///
enum Opcode : int {
  ///
  invalid = 0,
 
  ///
  constant = 1,
  ///
  var_x = 2,
  ///
  var_y = 3,
  ///
  var_z = 4,
  ///
  var_free = 5,
  ///
  const_var = 6,
 
  ///
  op_square = 7,
  ///
  op_sqrt = 8,
  ///
  op_neg = 9,
  ///
  op_sin = 10,
  ///
  op_cos = 11,
  ///
  op_tan = 12,
  ///
  op_asin = 13,
  ///
  op_acos = 14,
  ///
  op_atan = 15,
  ///
  op_exp = 16,
  ///
  op_abs = 28,
  ///
  op_log = 30,
  ///
  op_recip = 29,
 
  ///
  op_add = 17,
  ///
  op_mul = 18,
  ///
  op_min = 19,
  ///
  op_max = 20,
  ///
  op_sub = 21,
  ///
  op_div = 22,
  ///
  op_atan2 = 23,
  ///
  op_pow = 24,
  ///
  op_nth_root = 25,
  ///
  op_mod = 26,
  ///
  op_nanfill = 27,
  ///
  op_compare = 31,
 
  ///
  oracle = 32,
}

/// Takes a string description of an op-code ('min', 'max', etc) and returns the libfive::Opcode value, or -1 if no
/// such value exists.
Opcode opcode(string op) {
  import std.string : toStringz;
  return cast(Opcode) libfive_opcode_enum(op.toStringz);
}

/// Returns: The number of arguments for the given opcode (either 0, 1, 2, or -1 if the opcode is unknown).
int args(Opcode op) {
  import std.conv : to;
  return libfive_opcode_args(op.to!int);
}
