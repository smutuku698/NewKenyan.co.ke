#!/bin/bash

# Update apartments-for-sale
sed -i '7a\import LocationDirectory from '"'"'@/components/LocationDirectory'"'"';' src/app/apartments-for-sale/[location]/page.tsx

# Update apartments-for-rent
sed -i '7a\import LocationDirectory from '"'"'@/components/LocationDirectory'"'"';' src/app/apartments-for-rent/[location]/page.tsx

echo "Location pages updated successfully"
