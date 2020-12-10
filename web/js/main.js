function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function resetSwitcher(layer) {
    $(".precinct-layers .btn").removeClass("active");
    $(".precinct-layers .btn."+layer).addClass("active");
}

function makePct(num,den) {
    return ((num/den)*100).toFixed(1);
}

function clearInfo() {
    $(".pcounty,.pname,.elex,.val").html("");
}


    var precinctData = {};
    var precids = {};

    //pull in geojson  and loop through it to make some arrays for later use
    $.ajax({
        type: 'GET',
        async: false,
        url: 'data/precincts3.json',
        data: { get_param: 'value' },
        dataType: 'json',
        success: function (data) {
            $.each(data.features, function(k, v) {
                precdata = data;
                precids[v.properties.p_id] = k;
                p = v.properties;
                g = v.geometry;
                bbox = turf.extent(g);
                precinctData[p.p_id] = {
                    "county": p.county,
                    "bbox": bbox
                }
            })
         }
    });

    var countyids = { "Multnomah": 410510000, "Clackamas": 410050000, "Washington": 410670000 };
    var layers = ['precincts_16','precincts_20','shift_20'];

    mapbox_path = "mapbox://mfriesenwisc.";

    mapboxgl.accessToken = 'pk.eyJ1IjoibWZyaWVzZW53aXNjIiwiYSI6ImNqenhjcjAzYjBlc3QzbmtpODI1YXZxNmgifQ.Zz-z-Ykof8NbNaQOdR6ouQ';
    var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/light-v10',
      fitBounds: [-122.5795,45.5283],
      zoom: 3
    });
    map.fitBounds([[-123,45.2],[-122,45.7]], {padding: {top: 150, bottom: 0, left: 250, right: 5} });

    var nav = new mapboxgl.NavigationControl({showCompass:false});
    map.addControl(nav,'top-left');
    var hoveredStateId = null;

    $(".info").on("click",function() {
        $(this).hide();
    })
    

    map.on('load',function() {
    

        resetSwitcher("precincts_20");
        $('.info').hide();
        
        
        //add geojson data as source for map layers
        map.addSource('precincts', {
            'type': 'geojson',
            'data': precdata,
            'generateId': true
        });


        //add different map layers

        map.addLayer({
            'id': 'precincts_20',
            'type': 'fill',
            'source': 'precincts',
            'layout': { 'visibility': 'visible' },
            'paint': {
                'fill-opacity': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    1,
                    0.8
                ],
                'fill-color': [
                    "case", // Begin case expression
                    ['==', ['get','T_20'], 0], '#ddd',
                    
                    ['>',['get','D_20'],['get','R_20']],
                    ['interpolate',
                    ['linear'],
                    ['/',['get','D_20'],['get','T_20']],    
                    .40,
                    '#d1e5f0',
                    .60,
                    '#92c5de',
                    .70,
                    '#4393c3',
                    .80,
                    '#2166ac',
                    .90,
                    '#053061'
                    ],                
                    ['interpolate',
                    ['linear'],
                    ['/',['get','R_20'],['get','T_20']],    
                    .40,
                    '#fddbc7',
                    .60,
                    '#f4a582',
                    .70,
                    '#d6604d',
                    .80,
                    '#b2182b',
                    .90,
                    '#67001f'
                    ]
                ]
            }
        })
        


        map.addLayer({
            'id': 'precincts_16',
            'type': 'fill',
            'source': 'precincts',
            'layout': { 'visibility': 'none' },
            'paint': {
                'fill-opacity': [
                    'case',
                    ['==', ['get','T_16'], null], 0,
                    ['boolean', ['feature-state', 'hover'], false],
                    1,
                    0.8
                ],
                'fill-color': [
                    "case", // Begin case expression
                    ['==', ['get','T_16'], 0], '#ddd',
                    ['==', ['get','T_16'], null], '#fff',
                    
                    ['>',['get','D_16'],['get','R_16']],
                    ['interpolate',
                    ['linear'],
                    ['/',['get','D_16'],['get','T_16']],    
                    .40,
                    '#d1e5f0',
                    .60,
                    '#92c5de',
                    .70,
                    '#4393c3',
                    .80,
                    '#2166ac',
                    .90,
                    '#053061'
                    ],                
                    ['interpolate',
                    ['linear'],
                    ['/',['get','R_16'],['get','T_16']],    
                    .40,
                    '#fddbc7',
                    .60,
                    '#f4a582',
                    .70,
                    '#d6604d',
                    .80,
                    '#b2182b',
                    .90,
                    '#67001f'
                    ]
                ]
            }
        })


 
         map.addLayer({
            'id': 'shift_20',
            'type': 'fill',
            'source': 'precincts',
            'layout': { 'visibility': 'none' },
            'paint': {
                'fill-opacity': [
                    'case',
                    ['==', ['get','county'], "Clackamas"], 0,
                    ['boolean', ['feature-state', 'hover'], false],
                    1,
                    0.8
                ],
                'fill-color': [
                    'interpolate',
                    ['linear'],
                    ["-",["-",["*",["/",['get','R_20'],['get','T_20']],100],["*",["/",['get','D_20'],['get','T_20']],100]],["-",["*",["/",['get','R_16'],['get','T_16']],100],["*",["/",['get','D_16'],['get','T_16']],100]]], //shift_20
                    -15,
                    '#053061',
                    -12,
                    '#2166ac',
                    -9,
                    '#4393c3',
                    -6,
                    '#92c5de',
                    -3,
                    '#d1e5f0',
                    3,
                    '#fddbc7',
                    6,
                    '#f4a582',
                    9,
                    '#d6604d',
                    12,
                    '#b2182b',
                    15,
                    '#67001f'
                ]
            }
        })
         
         
         
        // loop through layers to add listeners to each
        $.each(layers,function(k,layer) {
            map.on('click',layer,function(e) {
                var p = e.features[0].properties;
                mapClick(p);
            })
 
             map.on('mouseenter', layer, function() {
                map.getCanvas().style.cursor = 'pointer';
            });

            map.on('mousemove', layer, function(e) {
                if (e.features.length > 0) {
                    if (hoveredStateId) {
                        map.setFeatureState(
                            { source: 'precincts', id: hoveredStateId },
                            { hover: false }
                        );
                    }
                    hoveredStateId = e.features[0].id;
                    map.setFeatureState(
                        { source: 'precincts', id: hoveredStateId },
                        { hover: true }
                    );
                }
            });
            map.on('mouseleave', layer, function() {
                map.getCanvas().style.cursor = '';
                if (hoveredStateId) {
                    map.setFeatureState(
                        { source: 'precincts', id: hoveredStateId },
                        { hover: false }
                    );
                }
            });
 
            
        })


//             make legend
        // make a pointer cursor
        map.getCanvas().style.cursor = 'default';
        var legendblock = "";
/*
        $.each(colors, function(k,v) {
            var legend_break;
            if (k==0) {
                legend_break = "<$"+addCommas(breaks[1]);
            } else if (k==7) {
                legend_break = ">$"+addCommas(breaks[7]);
            } else {
                legend_break = "$" + addCommas(breaks[k]) + "-$" + addCommas(breaks[k+1]-1);
            }
            legendblock += "<div>"
                + "<span class='legend-key' style='background-color:"+v+"'></span>"
                + "<span class='legend-val'>"+legend_break+"</span>"
                + "</div>";
        })
*/
/*
        legendblock = "<div class='legend_parcels'><div class='legend-hed'>PROPERTY VALUE KEY</div>"+legendblock+"<div class='note'>" + cityData[city].name +" median single family home value: $"+addCommas(breaks[4])+"</div></div>";

        legendblock += "<div class='legend_demographics'><div class='legend-hed'>NON-WHITE POPULATION</div>"
        +        "<div class='legend-scale'>"
        +            "<ul class='YlGnBu legend-labels'>"
        +                "<li>"
        +                    "<span class='q0-5'></span>"
        +                "</li>"
        +                "<li>"
        +                    "<span class='q1-5'></span>"
        +                "</li>"
        +                "<li>"
        +                    "<span class='q2-5'></span>"
        +                "</li>"
        +                "<li>"
        +                    "<span class='q3-5'></span>"
        +                "</li>"
        +                "<li>"
        +                    "<span class='q4-5'></span>"
        +                "</li>"
        +            "</ul>"
        +            "<ul class='legend-labels tick-values'>"
        +                "<li style='width:10%'></li>"
        +                "<li>25%</li>"
        +                "<li>40%</li>"
        +                "<li>60%</li>"
        +                "<li>80%</li>"
        +            "</ul>"
        +        "</div>"
        +   "</div>";


        
        $("#legend").html(legendblock);
        $("#legend").show();
*/

        //Remove any markers on search box focus
        $("input#q").focus(function() {
            marker.remove()
        });
        

        //Code for layer toggle
        $(".precinct-layers").show();
        $(".btn").on("click",function() {
            var thisLayer = $(this).data("layer");
            resetSwitcher(thisLayer);
            $.each(layers,function(k,layername) {
               map.setLayoutProperty(layername, 'visibility', 'none'); 
            })
            map.setLayoutProperty(thisLayer, 'visibility', 'visible');
            
/*
            
            var clickedLayer = thisLayer;
            $(".btn."+thisLayer).toggleClass("active");
            var visibility = map.getLayoutProperty(clickedLayer,'visibility');
            if (visibility === 'visible') {
                $(".btn."+thisLayer).removeClass("active");
                map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            } else {
                $(".btn."+thisLayer).addClass("active");
                map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
            }
 
            if ($(".btn.parcels").hasClass("active")) {
                $(".legend_parcels").show();
            } else {
                $(".legend_parcels").hide();
            }
            if ($(".btn.demographics").hasClass("active")) {
                $(".legend_demographics").show();
            } else {
                $(".legend_demographics").hide();
            }
            if ((!$(".btn.parcels").hasClass("active")) && (!$(".btn.demographics").hasClass("active"))) {
                $("#legend").hide();
            }
*/
            
            
        })
    })



    //Function for a map click. 
    function mapClick(p) {
        clearInfo();
        var id = p.p_id;
        var value = p.propval;
        var allother = p.other+p.pi+p.mult+p.nat_am;
        
        //calculate vote margins 
        var t_20 = p.T_20;
        var r_20 = p.R_20;
        var d_20 = p.D_20;
        var d_20_pct = d_20/t_20;
        var r_20_pct = r_20/t_20;
        var margin_20 = ((r_20_pct*100)-(d_20_pct*100)).toFixed(1);

        var margin_party = "R";
        if (margin_20<0) {
            margin_party = "D";
        }
        var marginnum = Math.abs(margin_20);
        var marginblock = "<td><div><span class='marginblock shift_"+margin_party+"'>"+margin_party+"+"+marginnum+"</span></div></td>";

        var marginheader = "<th>2020 margin</th>";


        var shiftblock = "";
        
        var elexrez = "<table class='elex_20'>"
            +   "<tr><th style='width:40%'>2020</th><th class='num' style='width:35%'>Votes</th><th class='num' style='width:25%'>Pct</th></tr>"
            +   "<tr><td>Biden</td><td class='num'>"+addCommas(d_20)+"</td><td class='num'>"+(d_20_pct*100).toFixed(1)+"%</td></tr>"
            +   "<tr><td>Trump</td><td class='num'>"+addCommas(r_20)+"</td><td class='num'>"+(r_20_pct*100).toFixed(1)+"%</td></tr>"
            +   "</table>";

        //calculate 2016 margins and election shift in Multnomah/Washington
        if (p.county!="Clackamas") {
            var t_16 = p.T_16;
            var r_16 = p.R_16;
            var d_16 = p.D_16;
            var d_16_pct = d_16/t_16;
            var r_16_pct = r_16/t_16;
            var margin_16 = (r_16_pct*100)-(d_16_pct*100);
            var shift = (margin_20-margin_16).toFixed(1);
            var shiftnum = Math.abs(shift);
            var party = "R";
            var arrow = shiftnum+" <i class='fas fa-arrow-right'></i>";
            if (shift<0) {
                party = "D";
                arrow = "<i class='fas fa-arrow-left'></i> "+shiftnum;
            } else if (shift==0) {
                arrow = shiftnum;
            }
            //text blocks for 2016 data and election shift
            marginheader += "<th>2016-2020 shift</th>";
            shiftblock = "<td><div><span class='shiftblock shift_"+party+"'>"+arrow+"</span></div></td>";
            elexrez += "<table class='elex_16'>"
                +   "<tr><th style='width:40%'>2016</th><th class='num' style='width:35%'>Votes</th><th class='num' style='width:25%'>Pct</th></tr>"
                +   "<tr><td>Clinton</td><td class='num'>"+addCommas(d_16)+"</td><td class='num'>"+(d_16_pct*100).toFixed(1)+"%</td></tr>"
                +   "<tr><td>Trump</td><td class='num'>"+addCommas(r_16)+"</td><td class='num'>"+(r_16_pct*100).toFixed(1)+"%</td></tr>"
                +   "</table>";
        }
        //builds tables for election results and precinct demographics
        var margintable = "<table class='margins'>"
            + "<tr>"+marginheader+"</tr>"
            + "<tr>"+marginblock+shiftblock+"</tr>"
            + "</table>";
        
        var demo = "<tr><th style='width:40px'>Demographics</th><th style='width:35px'></th><th style='width:25px'></th></tr>"
            + "<tr><td>Population</td> <td class='num'></td><td class='num'>"+addCommas(p.pop)+"</td></tr>"
            + "<tr><td>White</td> <td class='num'>"+addCommas(p.white)+"</td><td class='num'>"+makePct(p.white,p.pop)+"%</td></tr>"
            + "<tr><td>Black</td> <td class='num'>"+addCommas(p.black)+"</td><td class='num'>"+makePct(p.black,p.pop)+"%</td></tr>"
            + "<tr><td>Hispanic</td> <td class='num'>"+addCommas(p.hisp)+"</td><td class='num'>"+makePct(p.hisp,p.pop)+"%</td></tr>"
            + "<tr><td>Asian</td> <td class='num'>"+addCommas(p.asian)+"</td><td class='num'>"+makePct(p.asian,p.pop)+"%</td></tr>"
            + "<tr><td>Other</td> <td class='num'>"+addCommas(allother)+"</td><td class='num'>"+makePct(allother,p.pop)+"%</td></tr>";
        
        //zoom to clicked precinct
        map.fitBounds(precinctData[id].bbox,{padding: {top: 150, bottom: 20, left: 150, right: 250} });
        if (value>0) {
            demo += "<tr><td colspan=2>Median home value</td><td class='num'>$"+addCommas(value)+"</td></tr>";
        }
        $(".pcounty").text(p.county+" County");
        $(".pname").text("Precinct "+p.prec_num);
        $(".elex").html(margintable+elexrez);
        $(".val").html("<table class='demo'>"+demo+"</table>");
        $(".info").show();
    }
    
    
    
    //function that passes address to Oregon Metro JS api
    function getPrec(address) {
    	RLIS.QueryAddress(address, function (result, error) {
    	    if (error) {
    	        alert("Error: " + result);
    	        return;
    	    }
            //pull precinct number, county name and lat/long from api response
    	    precnum = Math.round(result[0].voterPrecinct);
    	    countyname = result[0].county;
    	    lat = result[0].lat;
    	    lng = result[0].lng;
    	    countynum = countyids[countyname];
    	    pid = countynum+precnum;
    	    
    	    //use precinct id to generate map click and add marker to map
    	    mapClick(precdata.features[precids[pid]].properties);
    	    var marker = new mapboxgl.Marker()
                .setLngLat([lng, lat])
                .addTo(map);
    	}, 'voterPrecinct,county,lat,lng');
    }

