/// 
/// Remarks: Modeled library after libfive's C++ standard library.
/// License: MPL-2.0
/// See_Also: <a href="https://github.com/libfive/libfive/blob/master/libfive/stdlib/stdlib_impl.hpp">libfive/stdlib/stdlib_impl.hpp</a>
import stdlib;
import tree;

/// A range used in interval arithmetic.
///
/// It usually represents either a spatial region (along a single axis) or a range that is guaranteed to contain a value.
alias Interval = libfive_interval;

/// A 2D region
alias Region2 = libfive_region2;

/// A 3D region.
alias Region3 = libfive_region3;

/// A 2D point or vector.
alias Vec2 = libfive_vec2;

/// A 3D point or vector.
alias Vec3 = libfive_vec3;

/// A 4D point or vector.
alias Vec4 = libfive_vec4;

/// A triangle, with corners stored as indices into a separate vertex array.
alias Tri = libfive_tri;

/// A single 2D contour, consisting of a slice of 2D points.
alias Contour = Vec2[];
/// A set of 2D contours, consisting of a slice of `Contour` objects.
alias Contours = Contour[];

/// A single 3D contour, consisting of a slice of 3D points.
alias Contour3 = Vec2[];
/// A set of 3D contours, consisting of a slice of `Contour3` objects.
alias Contours3 = Contour3[];

/// An indexed 3D mesh.
struct Mesh {
  /// Opaque pointer to C API-managed mesh.
  private libfive_mesh* mesh;
  
  ~this() {
    libfive_mesh_delete(mesh);
    mesh = null;
  }

  ///
  Vec3[] verts() inout {
    return mesh.verts[0 .. mesh.vert_count];
  }
  ///
  Tri[] tris() inout {
    return mesh.tris[0 .. mesh.tri_count];
  }
}

///
size_t triCount(const Mesh m) {
  return m.tris.length;
}

/// A bitmap representing occupancy. There are `width` * `height` pixels, in row-major order.
alias Pixels = libfive_pixels;
