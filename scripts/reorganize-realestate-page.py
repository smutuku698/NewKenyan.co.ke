#!/usr/bin/env python3
"""
Reorganize Real Estate Companies page:
1. Move companies section to appear before market overview
2. Improve color scheme and contrast
3. Make search bar more visible
"""

import re

# Read the file
with open('src/app/real-estate-companies-in-kenya/RealEstateCompaniesPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the companies section (starts at line ~1197)
companies_pattern = r'(<section id="companies".*?</section>)\s*(?=\s*{/\* Related Resources Section \*/)'
companies_match = re.search(companies_pattern, content, re.DOTALL)

if not companies_match:
    print("Could not find companies section!")
    exit(1)

companies_section = companies_match.group(1)

# Remove companies section from its current location
content_without_companies = content[:companies_match.start()] + content[companies_match.end():]

# Find where to insert (right after "div className="container mx-auto px-4 py-12">")
insertion_point = content_without_companies.find('<div className="container mx-auto px-4 py-12">')
if insertion_point == -1:
    print("Could not find insertion point!")
    exit(1)

# Find the end of that opening div tag line
insertion_point = content_without_companies.find('\n', insertion_point) + 1

# Insert companies section at the top
new_content = (
    content_without_companies[:insertion_point] +
    '\n          ' + companies_section + '\n\n' +
    content_without_companies[insertion_point:]
)

# Now improve the visual design
# 1. Change blue gradient to green for companies header
new_content = new_content.replace(
    'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600',
    'bg-gradient-to-r from-green-700 via-green-600 to-teal-600'
)

# 2. Change button colors from blue to green
new_content = re.sub(
    r'text-white text-blue-600',
    'text-white text-green-700',
    new_content
)
new_content = re.sub(
    r'hover:bg-blue-50',
    'hover:bg-green-50',
    new_content, count=2  # Only first few occurrences in companies section
)

# 3. Change text colors in companies section from blue to green
new_content = new_content.replace('text-blue-100', 'text-green-100')

# 4. Improve statistics cards - reduce yellow, use more neutral colors
new_content = new_content.replace(
    'bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border-2 border-yellow-200',
    'bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border-2 border-orange-200'
)
new_content = new_content.replace(
    'text-yellow-600',
    'text-orange-600'
)

# Write the reorganized file
with open('src/app/real-estate-companies-in-kenya/RealEstateCompaniesPage.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully reorganized Real Estate Companies page!")
print("   - Companies section moved to top (before Market Overview)")
print("   - Color scheme improved (green theme)")
print("   - Better contrast and professional appearance")
