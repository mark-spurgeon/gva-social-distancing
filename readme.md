Social Distancing Needs for shoppers in Geneva
====

As the COVID-19 outbreak goes on, the city of Geneva has seen many queues forming outside of shops. As people go out to buy food, they have to queue outside to keep safe social distances. However, in Geneva's dense streets, it is hard to do so.

For that reason, I've decided to measure the need for more space in areas that are busy with shoppers. Hopefully, this map will prompt the local government to apply temporary measures, like pedestrianizing streets, to free up space for shoppers, runners and walkers.

It is not only a question of keeping safe distances : more free space for more movement will reassure the local community and allow them to enjoy the outside world while preventing the virus to spread too much. It is a matter of keeping people's mental health on check as this exceptionnal situation will go on during several weeks and months.

Check out the map here: https://markspurgeon.ch/gva-covid-distancing/

Data
---

Three main items of data have been used:

* Free space: mainly consists of pedestrian paths, sidewalks and parks.
* Roads: contains roads and parking spaces.
* Commerce: the address of each commerce and the details of the commerce type.

Free space has been cut into pieces in order to visualize the differences in available places. To do that, a voronoi map has been created from the commerces, then cliped with the free space layer. Some polygons didn't contain shops, so they've been filtered out. Then a second voronoi has been created to ignore the empty polygons (these counting as more available space for shops).

To count the **needed places** each shop needs, there was no way to count the real need, but they've been estimated based on observations and summed up for each free space area : 

* Very Big Supermarkets : 35 
* Big Dupermarkets & 'Department Stores' : 30 (main type of supermarket in Geneva)
* Smaller Supermarkets : 15
* 'Convenience Stores' : 6 (alternative to supermarket)
* Specialized Shops : 10 (They vary a lot)
* Bakeries, Restaurants, etc... : 4 (restaurants vary: some only deliver)

To count the **available places**, a grid if points distances by 2 metres have served as the basis to count available places per area.


Validity
---

It is clear that this map is merely an estimation. It is based on mathematical analysis and on minimum observation. The map may ignore or overrepresent some areas that are concerned by missing space. Moreover, the precision of the map may be misleading : it is better to interpret the map broadly rather than specific to one corner of a street. 

However, the map clearly shows streets that have, or will have, a tendency to saturate regarding the exceptionnal social distancing rules. They display the priority areas where the local government's interventions should focus.

Contribute / Play with the data
---

The map is built with OpenLayers and bundled with Parcels.

You need to use `npm` or `yarn`

Install these global packages to run the script : `yarn add -g shapefile reproject`
And install local packages this way : `yarn` 

The map interprets GeoJSON files. There is a script (`scripts/converter.sh`) that converts shapefiles (in `data/`) to reprojected geojson files (in `dist/data`). 

Also, the shapefiles have been simplified to 2 levels, in order make the map quicker. `<>-web.shp` files have a simplification tolerance of 0.5m, and `<>-web-simple.shp` files have a tolerance of 4m.

Scripts:
* `yarn start` : run development server
* `yarn build` : build to `dist`
* `yarn convert` : convert shapefiles to geojson


