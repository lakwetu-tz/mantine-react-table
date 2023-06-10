#!/bin/bash

# Change directory to the example directory
cd /path/to/example

# Loop through each file in the example directory
for file in *; do
  if [ -d "$file" ]; then
    echo "Processing $file..."

    # Change directory to the current file
    cd "$file"

    # Check if the sandbox directory exists
    if [ -d "sandbox" ]; then
      # Change directory to the sandbox directory
      cd sandbox

      # Check if node_modules directory already exists
      if [ ! -d "node_modules" ]; then
        echo "  - Running npm install in sandbox..."

        # Run npm install
        npm install

        echo "  - npm install completed"
      else
        echo "  - node_modules directory already exists. Skipping npm install."
      fi

      # Change back to the example directory
      cd ..
    else
      echo "  - No sandbox directory found"
    fi

    # Change back to the parent directory of the current file
    cd ..
    echo "Completed processing $file"
    echo
  fi
done

