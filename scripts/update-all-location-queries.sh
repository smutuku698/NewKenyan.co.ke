#!/bin/bash

# Update all dynamic location pages to use .ilike() for flexible county matching

echo "🔧 Updating all dynamic location pages..."

# Find all [location]/page.tsx files
files=$(find src/app -type f -name "page.tsx" -path "*\[location\]*")

updated_count=0
error_count=0

for file in $files; do
  # Skip if already updated
  if grep -q "query.ilike('county'" "$file"; then
    echo "⏭️  Skipped (already updated): $file"
    continue
  fi

  # Check if file has the pattern we need to update
  if grep -q "query.eq('county', location.name)" "$file"; then
    # Create backup
    cp "$file" "$file.bak"

    # Update the county queries
    sed -i "s/query.eq('county', location.name)/query.ilike('county', \`%\${location.name}%\`)/" "$file"
    sed -i "s/\.eq('county', location.county)/\.ilike('county', \`%\${location.county}%\`)/" "$file"

    echo "✅ Updated: $file"
    ((updated_count++))
  else
    echo "⏭️  Skipped (no match): $file"
  fi
done

echo ""
echo "═══════════════════════════════════════"
echo "📊 UPDATE SUMMARY"
echo "═══════════════════════════════════════"
echo "✅ Files updated: $updated_count"
echo "⏭️  Files skipped: $((${#files[@]} - updated_count))"
echo "═══════════════════════════════════════"
