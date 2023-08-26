/// License: MPL-2.0
/// See_Also: <a href="https://github.com/libfive/libfive/blob/master/libfive/include/libfive/tree/tree.hpp">libfive/include/libfive/tree/tree.hpp</a>
import std.meta : Alias;

import opcode;
import stdlib;

struct TreeVec2 {
  Tree x, y;
}

struct TreeVec3 {
  Tree x, y, z;
}
///
alias TreeFloat = Tree;

/// Opaque pointer representing a `Tree`'s unique ID.
/// See_Also: `Tree.id`
alias Id = const void*;

/// A Tree represents a tree of math expressions.
///
/// It is a data object (passed around by value), which is a reference-counted wrapper around a TreeData pointer on the
/// heap. This is a class because we have very particular needs:
///
/// $(UL
///   $(LI
///     For the C API, we want to release pointers without decrementing the reference count, which prohibits shared_ptr.
///   )
///   $(LI
///     When destroying deeply nested trees, use the heap rather than the stack to prevent overflow, which prohibits `struct`.
///   )
/// )
///
/// See_Also: <a href="https://github.com/libfive/libfive/blob/master/libfive/include/libfive/tree/tree.hpp">libfive/include/libfive/tree/tree.hpp</a>
class Tree {
  /// Unique identifier for the underlying clause. This is not automatically deduplicated, so the same logic trees may
  /// have different IDs.
  ///
  /// This is primarily used to uniquely identify free variables, i.e. trees returned from `Tree.var`.
  Id id() const {
    return libfive_tree_id(this.ptr);
  }

  /// This is the managed pointer. It's mutable so that the destructor can swap it out for `null` when flattening out
  /// destruction of a Tree (to avoid blowing up the stack).
  package void* ptr = null;

  /// Constructor to build from the raw variant pointer. This is used to build a temporary Tree around a raw pointer
  /// acquired from `release()` in libfive's C API.
  this(Id raw) {
    this.ptr = raw;
  }
  /// Constructs a constant Tree with a floating-point value.
  this(double v) {
    this.ptr = libfive_tree_const(v);
  }
  
  ~this() {
    libfive_tree_delete(this.ptr);
  }

  /// These are the main constructors used to build Trees.
  /// 
  /// In code `X`, `Y`, and `Z` are singletons, since they're used a lot
  static Tree X() {
    return Tree(libfive_tree_x());
  }
  /// ditto
  static Tree Y() {
    return Tree(libfive_tree_y());
  }
  /// ditto
  static Tree Z() {
    return Tree(libfive_tree_z());
  }
  
  static Tree one() {
    return Tree(1);
  }

  /// Returns a tree for which `invalid` is `true` (under the hood, uses the `TreeInvalid` variant).
  static Tree invalid() {
    assert(0, "Unimplemented!");
  }

  /// Returns a new unique variable.
  static Tree var() {
    return Tree(libfive_tree_var());
  }

  /// Constructs a tree with the given no-argument opcode.
  /// Returns: `null` if the opcode is invalid.
  static Tree nullary(Opcode op) {
    auto tree = libfive_tree_nullary(op.to!int);
    if (tree is null) return null;
    return Tree(tree);
  }
  
  /// Constructs a tree with the given one-argument opcode.
  /// Returns: `null` if the opcode or argument is invalid.
  static Tree unary(Opcode op, Tree a) {
    auto tree = libfive_tree_unary(op.to!int, a.ptr);
    if (tree is null) return null;
    return Tree(tree);
  }

  /// Constructs a tree with the given two-argument opcode.
  /// Returns: `null` if the opcode or arguments are invalid.
  static Tree binary(Opcode op, Tree lhs, Tree rhs) {
    auto tree = libfive_tree_binary(op.to!int, lhs.ptr, rhs.ptr);
    if (tree is null) return null;
    return Tree(tree);
  }

  /// Returns a tree with all remap operations expanded.
  Tree flatten() inout {
    assert(0, "Unimplemented!");
  }
  
  /// Returns a new tree which has been optimized!
  ///
  /// Remarks:
  /// An optimized tree is deduplicated: subexpressions which are logically the same become shared, to make evaluation
  /// more efficient.
  ///
  /// An optimized tree also has nested affine forms collapsed, e.g. (2*X + 3*Y) + 5*(X - Y) ==> 7*X - 2*Y
  ///
  /// If the input tree contained remap operations, it will be flattened before optimization.
  Tree optimized() inout {
    auto tree = libfive_tree_optimized(this.ptr);
    if (tree is null) return null;
    return Tree(tree);
  }

  /// Counts the number of unique nodes in the tree.
  size_t size() const {
    assert(0, "Unimplemented!");
  }

  /// For associative arrays of `Tree`s.
  override size_t toHash() const @nogc @safe pure nothrow {
    return this.id.hashof;
  }
  /// ditto
  bool opEquals(R)(const R other) const {
    return this.toHash == other.toHash;
  }
}

unittest {
  const tree = new Tree(2);
  assert(tree !is null);
}

/// Returns: `true` if the given tree is a free variable
bool isVar(Tree tree) {
  return libfive_tree_is_var(tree.ptr);
}
