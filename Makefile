OS := $(shell uname -s)
ARCH := $(shell uname -m)

ifeq (${OS},Darwin)
LIBFIVE_ARTIFACTS += bin/libfive.dylib
else ifeq (${OS},Linux)
LIBFIVE_ARTIFACTS += bin/libfive.so
endif

.DEFAULT_GOAL = all

all: $(LIBFIVE_ARTIFACTS)
	dub build --annotate
	# TODO: dub build --root=examples/csg

# Subprojects
subprojects/libfive/src/libfive.dylib: $(LIBFIVE_ARTIFACTS)

subprojects/libfive:
subprojects/libfive/libfive/include/libfive.h:
	git submodule update --init --recursive

$(LIBFIVE_ARTIFACTS): subprojects/libfive.Makefile subprojects/libfive
	@make -C subprojects -f libfive.Makefile
	@mkdir -p bin
ifeq (${OS},Darwin)
	# TODO: Add checks for ARM mac OS artifacts
	@cp subprojects/libfive/build/libfive/src/libfive.dylib bin
else
	# TODO: Dynamically build OS DLL
	$(error Unsupported target platform: $OS)
endif

# Cleanup
.PHONY: clean
clean:
	@rm -rf bin
