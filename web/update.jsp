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
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Playfair+Display:wght@900&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/4b7b7915d1.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
<div id="update">
    <h1 id="title">Portland metro precinct results</h1>

    <div class="container">
        <div class="row">
            <div class="col-12">
                <h2>Add precinct vote data</h2>
                <form id = "create_report_form">
                    <div class="form-group">
                        <label>County:</label>
                            <select name="county">
                                <option value="">Choose the county</option>
                                <option value=410050000>Clackamas</option>
                                <option value=410510000>Multnomah</option>
                                <option value=410670000>Washington</option>
                            </select>
                    </div>
                    <div class="form-group">
                        <label>Precinct number:</label>
                        <input placeholder="Precinct number" name="precinct">
                    </div>
                    <div class="form-group">
                        <h5>2016 election</h5>
                        <label>Trump vote:</label>
                        <input placeholder="Republican vote" name="R_16">
                    </div>
                    <div class="form-group">
                        <label>Clinton vote:</label>
                        <input placeholder="Democrat vote" name="D_16">
                    </div>
                    <div class="form-group">
                        <label>Total vote:&nbsp</label><input placeholder="Total vote" name="T_16">
                    </div>
                    <div class="form-group">
                        <h5>2020 election</h5>
                        <label>Trump vote:</label>
                        <input placeholder="Republican vote" name="R_20">
                    </div>
                    <div class="form-group">
                        <label>Biden vote:</label>
                        <input placeholder="Democrat vote" name="D_20">
                    </div>
                    <div class="form-group">
                        <label>Total vote:&nbsp</label><input placeholder="Total vote" name="T_20">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>




</div>

<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
<script src="js/loadform.js"></script>
</body>

</html>


