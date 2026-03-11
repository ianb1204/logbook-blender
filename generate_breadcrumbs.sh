#!/usr/bin/env bash

CONTENT_DIR="./src/content"
OUTPUT="$CONTENT_DIR/breadcrumbs.json"

generate_dir() {
    local dir="$1"
    local indent="$2"
    local dirname=$(basename "$dir")
    local first=true

    echo "{"

    for file in "$dir"/*.md; do
        [ -e "$file" ] || continue

        filename=$(basename "$file")
        name="${filename%.md}"

        if [[ "$filename" == "README.md" ]]; then
            continue
        fi

        $first || echo ","
        first=false

        if [[ "$name" == "$dirname" ]]; then
            printf "%${indent}s\"home\": \"%s\"" "" "$filename"
        else
            printf "%${indent}s\"%s\": \"%s\"" "" "$name" "$filename"
        fi
    done

    for subdir in "$dir"/*/; do
        [ -d "$subdir" ] || continue

        name=$(basename "$subdir")

        $first || echo ","
        first=false

        printf "%${indent}s\"%s\": " "" "$name"
        generate_dir "$subdir" $((indent+4))
    done

    echo
    printf "%$((indent-4))s}" ""
}

echo "{" > "$OUTPUT"

first=true
for lang in "$CONTENT_DIR"/*/; do
    name=$(basename "$lang")

    $first || echo "," >> "$OUTPUT"
    first=false

    printf "    \"%s\": " "$name" >> "$OUTPUT"
    generate_dir "$lang" 8 >> "$OUTPUT"
done

echo "" >> "$OUTPUT"
echo "}" >> "$OUTPUT"

echo "breadcrumbs.json generated."