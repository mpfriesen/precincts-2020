<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Portland metro precinct results</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  <script src='https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.js'></script>
  <link href='https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css' rel='stylesheet' />
  <script src='https://api.mapbox.com/mapbox.js/plugins/turf/v2.0.2/turf.min.js'></script>
  <script src="https://gis.oregonmetro.gov/rlisapi2/js/?token=fEnLqURQqnY4FilRiw7eIDAkDm0XOSkQeimtxRWUkLY."></script>
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Playfair+Display:wght@900&display=swap" rel="stylesheet">
  <script src="https://kit.fontawesome.com/4b7b7915d1.js" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="css/style.css">
  <link href="css/address.css" rel='stylesheet' type='text/css' />
</head>

<body>
<div>
  <h1 id="title">Portland metro precinct results<span>
<%--      <button type="button" class="btn btn-primary aboutbtn" data-toggle="modal" data-target="#AboutModal">About Redlining</button></span></h1>--%>

</div>
<!-- <nav id="menu" style="display:none"></nav> -->

<div class="precinct-layers">
  <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
    <button type="button" data-layer="precincts_20" class="btn btn-secondary precincts_20 active">2020 results</button>
    <button type="button" data-layer="precincts_16" class="btn precincts_16 btn-secondary">2016 results</button>
    <button type="button" data-layer="shift_20" class="btn shift_20 btn-secondary">2020 shift</button>
    <button type="button" data-layer="nonwhite" class="btn nonwhite btn-secondary">Nonwhite population</button>
  </div>
</div>
<div id='map'>
</div>
<div class="info">
  <div class="pcounty"></div>
  <div class="pname"></div>
  <div class="elex"></div>
  <div class="val"></div>
  <div class="clacknote">*2016 election results for Clackamas County not included; precinct boundaries changed between elections</div>
</div>
<div class="input-append input-prepend">
  <span class="add-on"><i class="fa fa-search"></i></span><input type="text" id="q" onfocus="this.value=''" placeholder="Enter a metro-area address...">
  <span class="reset_map">RESET MAP</span>
</div>

<div class="left-panels left-top">
  <div id="overview">
    <h6>Overview</h6>
    <p>Here are precinct-level 2020 presidential election results for the three-county Portland metro area. Also included, for two counties, are layers that show precinct results from 2016 and percentage-point shift between the two elections. A fourth layer shows the estimated nonwhite population in each precinct.</p>
    <p>Click on a precinct to see 2016 and 2020 election results and demographic information, including racial background and median home value. (Note that 2016 election data from Clackamas County is not included as precinct geography changed between the elections.)</p>
    <p>To find your precinct, enter an address in the search box.</p>
    <hr>
    <h6>Sources</h6>
    <p>Precinct geography: <a href="http://www.kevinrancik.com/elections/Oregon/eOregon.html">Kevin Rancik</a>, <a href="https://www.clackamas.us/gis">Clackamas County GIS Department</a></p>
    <p>2018 demographics: <a href="https://www.census.gov/">U.S. Census Bureau</a></p>
    <p>Election data: <a href="https://www.clackamas.us/elections/november-3-2020-general-election">Clackamas County elections office,</a> <a href="https://multco.us/elections/results-and-history-multnomah-county-elections">Multnomah County elections office</a>, <a href="https://www.co.washington.or.us/AssessmentTaxation/Elections/News/election-results.cfm">Washington County Elections Division</a>, <a href="http://www.kevinrancik.com/elections/Oregon/eOregon.html">Kevin Rancik</a> (2016 results)</p>
    <hr>
    <p><small>Map designed and created by Mark Friesen</small></p>
  </div>
</div>
<div class="left-panels left-bottom" id="legend"></div>

<!-- Modal -->
<%--<div class="modal fade" id="AboutModal" tabindex="-1" role="dialog" aria-labelledby="AboutRedlining" aria-hidden="true">--%>
<%--  <div class="modal-dialog" role="document">--%>
<%--    <div class="modal-content">--%>
<%--      <div class="modal-header">--%>
<%--        <h5 class="modal-title" id="AboutRedlining">About Redlining</h5>--%>
<%--        <button type="button" class="close" data-dismiss="modal" aria-label="Close">--%>
<%--          <span aria-hidden="true">&times;</span>--%>
<%--        </button>--%>
<%--      </div>--%>
<%--      <div class="modal-body">--%>
<%--        <p>Redlining refers to the discriminatory act of refusing to lend money, extend credit to borrowers, or show real estate in certain areas of a town. The term was dubbed from the idea that mortgage lenders would draw ?red lines? around--%>
<%--          neighborhoods which they did not want to make loans. </p>--%>

<%--        <p>Faced with a housing shortage in the 1930?s, the federal government established the Federal Housing Administration (FHA), which established practices that allowed further racial segregation and discrimination against minorities by--%>
<%--          refusing to insure loans to neighborhoods deemed less desirable.--%>
<%--        </p>--%>
<%--        <p>In 1935, the Home Owners Loan Corporation (HOLC) created ?residential security maps? for 239 cities, which graded neighborhoods based on loan desirability. Type ?A? neighborhoods were colored green and were reserved for affluent--%>
<%--          suburbs on the outskirts of towns. Type ?B?, or blue neighborhoods were considered desirable. However, type ?C?, or yellow neighborhoods, and type ?D?, or red neighborhoods were listed as declining. Typically the neighborhoods--%>
<%--          listed as declining contained older housing stock near the center of town, and frequently these areas contained minorities, immigrants, or were primarily African American.--%>
<%--        </p>--%>
<%--        <p>While the practice of redlining occurred prior to the establishment of the FHA, the HOLC maps further exacerbated racial segregation and urban decay by publishing these maps for use by lenders. For decades, the FHA used the HOLC--%>
<%--          maps in their appraisal manuals which instructed banks to steer clear of areas with certain racial groups. Withholding mortgages in these areas made it much harder for neighborhoods to attract families to purchase homes.--%>
<%--        </p>--%>
<%--        <p>The Fair Housing Act was passed in 1968 to combat the practice of redlining, making it unlawful for lenders to discriminate based on race or national origin. The Community Reinvestment Act passed in 1977 further reduced--%>
<%--          discriminatory practices by requiring banks to apply the same lending criteria in all communities.--%>
<%--        </p>--%>
<%--      </div>--%>
<%--      <div class="modal-footer">--%>
<%--        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>--%>
<%--      </div>--%>
<%--    </div>--%>
<%--  </div>--%>
<%--</div>--%>
<!--scripts-->
<script>
  var x= new RLIS.Autosuggest("q", {"mode":'query','entries':7} ,function (result, error){
    if (error) {
      alert(error);
      return;
    }
    var address = result[0].fullAddress;
    getPrec(address);
  }, 'locator,score,fullAddress');






</script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
<script src="js/main.js"></script>
</body>

</html>
