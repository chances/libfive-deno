.DEFAULT_GOAL = libfive/src/libfive.dylib

# QUESTION: Install the libfive library onto the host system?
.PHONY: libfive/src/libfive.dylib
libfive/src/libfive.dylib: libfive/build/Makefile
	# TODO: Build a static library on the host system and link libfive with libfive-d
	@make libfive -C libfive/build

libfive/build/Makefile: libfive/CMakeLists.txt libfive/libfive/CMakeLists.txt libfive/libfive/src/CMakeLists.txt
	@cmake -B libfive/build libfive -DBUILD_STUDIO_APP=OFF -DBUILD_GUILE_BINDINGS=OFF -DBUILD_PYTHON_BINDINGS=OFF
