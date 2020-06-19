(function() {
    
	// Create the connector object
    var myConnector = tableau.makeConnector();
	
    // Define the schema
    myConnector.getSchema = function(schemaCallback) {

    var cols = [{
            id: "name",
			alias: "name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "id",
			alias: "id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "latitude",
			alias: "latitude",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "longitude",
			alias: "longitude",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "altitude",
			alias: "altitude",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "velocity",
			alias: "velocity",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "visibility",
			alias: "visibility",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "footprint",
			alias: "footprint",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "timestamp",
			alias: "timestamp",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "daynum",
			alias: "daynum",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "solar_lat",
			alias: "solar_lat",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "solar_lon",
			alias: "solar_lon",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "units",
			alias: "units",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "ISSLocationData",
            alias: "ISS Location Data queried from www.wheretheiss.at",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {	
		 
		 $.ajax({
		 type: 'GET',
		 dataType: 'json',
		 // Satellite 25544 is the ISS
		 url: "https://api.wheretheiss.at/v1/satellites/25544",
		 success: function(resp) {
			var tableData = [];

                tableData.push({
                    "name": resp.name,
					"id": resp.id,
					"latitude": resp.latitude,
					"longitude": resp.longitude,
					"altitude": resp.altitude,
					"velocity": resp.velocity,
					"visibility": resp.visibility,
					"footprint": resp.footprint,
					"timestamp": resp.timestamp,
					"daynum": resp.daynum,
					"solar_lat": resp.solar_lat,
					"solar_lon": resp.solar_lon,
					"units": resp.units
                });
            
			
            table.appendRows(tableData);
            doneCallback();
		 }
		 });
		 };
		 
	tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
			tableau.connectionName = "ISS Location Data"; // This will be the data source name in Tableau
			tableau.submit(); // This sends the connector object to Tableau
		});
    });
})();