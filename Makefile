.DEFAULT_GOAL = all

all: bin/libfive.dylib
	dub build --annotate
	# TODO: dub build --root=examples/csg

# Subprojects
subprojects/libfive/src/libfive.dylib: bin/libfive.dylib

bin/libfive.dylib: subprojects/libfive.Makefile
	@make -C subprojects -f libfive.Makefile
	@mkdir -p bin
	@cp subprojects/libfive/build/libfive/src/libfive.dylib bin

# Cleanup
.PHONY: clean
clean:
	@rm -rf bin
