#!/bin/bash
SRC_FAVICON=favicon.png
OUT_FAVICON=./icon/favicon.ico
TMP_ICO=tmp

# ICO_BASIC_SIZES="16 24 32 48 256"
ICO_BASIC_SIZES="48"
# ICO_EXTRA_SIZES="20 30 36 40 60 64 72 80 96 512"

if command -v pngcrush >/dev/null 2>&1; then
    function optimize() {
        pngcrush -new -brute -ow "$@"
    }
else
    echo "pngcrush is not available - skipping PNG optimization"
    function optimize() {
        echo "Not optimizing:" "$@"
    }
fi

# usage: resize newWidth newHeight input output [otherOptions...]
function resize() {
    WIDTH=$1
    HEIGHT=$2
    SRC_T=$3
    DST=$4
    shift 4
    convert -background none -resize "${WIDTH}x${HEIGHT}" -extent "${WIDTH}x${HEIGHT}" -gravity center "$@" "${SRC_T}" "${DST}"
    optimize "${DST}"
}

if command -v convert >/dev/null 2>&1; then
    # Windows ICO
    mkdir -p "${TMP_ICO}"
    mkdir -p icon
    # for SIZE in ${ICO_BASIC_SIZES} ${ICO_EXTRA_SIZES}; do
    for SIZE in ${ICO_BASIC_SIZES}; do
        # resize "${SIZE}" "${SIZE}" "${SRC}" "${TMP_ICO}/icon_${SIZE}x${SIZE}.png"
        # resize "${SIZE}" "${SIZE}" "${SRC_SK}" "${TMP_ICO}/sk_${SIZE}x${SIZE}.png"
        resize "${SIZE}" "${SIZE}" "${SRC_FAVICON}" "${TMP_ICO}/favicon_${SIZE}x${SIZE}.png"
        # resize "48" "48" "${SRC_FAVICON}" "${TMP_ICO}/favicon_48x48.png"
    done
    # Asking for "Zip" compression actually results in PNG compression
    convert "${TMP_ICO}"/favicon_*.png -colorspace sRGB -compress Zip "${OUT_FAVICON}"
else
    echo "ImageMagick is not available - cannot convert icons"
fi
