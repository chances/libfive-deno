ifdef OS
  OS := Windows
  ARCH := $(PROCESSOR_ARCHITECTURE)
else
  OS := $(shell uname -s)
endif

.DEFAULT_GOAL = libfive

# QUESTION: Install the libfive library onto the host system?
# TODO: Build a static library on the host system and link libfive with libfive-d
libfive: libfive/build/Makefile
ifeq (${OS},Windows)
libfive: libfive/vcpkg libfive/vcpkg/packages
endif
	@make libfive-stdlib -C libfive/build -j4
.PHONY: libfive

libfive/vcpkg:
	@if not exist libfive/vcpkg git clone https://github.com/Microsoft/vcpkg.git libfive/vcpkg
libfive/vcpkg/packages: libfive/vcpkg
	@libfive/vcpkg/bootstrap-vcpkg.bat
	@libfive/vcpkg/vcpkg.exe install --triplet x64-windows eigen3 boost-container boost-bimap boost-interval boost-lockfree boost-functional boost-algorithm boost-math libpng

libfive/CMakeLists.txt:
	@git submodule update --init --recursive

libfive/build/Makefile: libfive/CMakeLists.txt libfive/libfive/CMakeLists.txt libfive/libfive/src/CMakeLists.txt
ifneq (${OS},Windows)
	@cmake -B libfive/build libfive -DBUILD_STUDIO_APP=OFF -DBUILD_GUILE_BINDINGS=OFF -DBUILD_PYTHON_BINDINGS=OFF
else
	@cmake -B libfive/build -DCMAKE_TOOLCHAIN_FILE="..\vcpkg\scripts\buildsystems\vcpkg.cmake" -DVCPKG_TARGET_TRIPLET="x64-windows" -G"Unix Makefiles" -DBUILD_STUDIO_APP=OFF -DBUILD_GUILE_BINDINGS=OFF -DBUILD_PYTHON_BINDINGS=OFF libfive
endif
