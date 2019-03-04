#!/bin/bash

rm output/a_example.txt
rm output/b_lovely_landscapes.txt
rm output/c_memoral_moments.txt
rm output/d_pet_pictures.txt
rm output/e_shiny_selfies.txt

node src/index.js > output/a_example.txt < input/a_example.txt
node src/index.js > output/b_lovely_landscapes.txt < input/b_lovely_landscapes.txt
node src/index.js > output/c_memoral_moments.txt < input/c_memoral_moments.txt
node src/index.js > output/d_pet_pictures.txt < input/d_pet_pictures.txt
node src/index.js > output/e_shiny_selfies.txt < input/e_shiny_selfies.txt