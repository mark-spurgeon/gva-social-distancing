#!/bin/bash
echo "Waiting for file conversions..."
## Create directory
[ ! -d "dist" ] && mkdir 'dist';
[ ! -d "dist/data" ] && mkdir 'dist/data';

## Variables
sourcedir="data"
outputdir="dist/data"

## Layers to convert
files=(
  "web/lac-rivieres-simple" 
  "web/batiments-simple"
  "commerces-simple"
  "web/routes-web-simple"
  "web/routes-web"
  "routes"
  "web/ppb-web-simple"
  "web/ppb-web"
  "ppb"
);

for i in "${files[@]}"; do 
    sourcefile="$sourcedir/$i.shp"
    tempfile="$sourcedir/tmp-${i#"web/"}.json"
    outputfile="$outputdir/${i#"web/"}.json"
    if [ -f $sourcefile ]; then
      ## Conversion to geojson > reprojection
      shp2json "$sourcefile" -o "$tempfile";
      echo $(<$tempfile) | reproject --eio --from=EPSG:2056 --to=EPSG:3857 > $outputfile;
      echo -e "👌 \033[0;32m'${outputfile}'";
      ## Cleanup
      rm -rf $tempfile
    else
      echo -e "😅 \033[0;31m'${sourcefile}': file does not exist";
    fi;
done