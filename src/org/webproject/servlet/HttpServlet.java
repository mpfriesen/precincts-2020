package org.webproject.servlet;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.webproject.servlet.DBUtility;

/**
 * Servlet implementation class HttpServlet
 */
@WebServlet("/HttpServlet")
public class HttpServlet extends javax.servlet.http.HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see javax.servlet.http.HttpServlet
     */
    public HttpServlet() {
        super();
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }


    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse
            response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String tab_id = request.getParameter("tab_id");

        // create a report
        if (tab_id.equals("0")) {
            System.out.println("A report is submitted!");
            try {
                createReport(request, response);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

//        // query reports
        else if (tab_id.equals("1")) {
            try {
                queryReport(request, response);
            } catch (JSONException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }

    private void createReport(HttpServletRequest request, HttpServletResponse
            response) throws SQLException, IOException {
        DBUtility dbutil = new DBUtility();
        String sql;
        Integer p_id;
        // create new precinct results
        Integer county = Integer.valueOf(request.getParameter("county"));
        Integer precinct = Integer.valueOf(request.getParameter("precinct"));
        String R_20 = request.getParameter("R_20");
        String D_20 = request.getParameter("D_20");
        String T_20 = request.getParameter("T_20");
        String R_16 = request.getParameter("R_16");
        String D_16 = request.getParameter("D_16");
        String T_16 = request.getParameter("T_16");
        p_id = county+precinct;
           // create the result
        sql = "insert into results (p_id, \"R_20\", \"D_20\", \"T_20\", \"R_16\", \"D_16\", \"T_16\") " +
                    "values (" + p_id + "," + R_20 + "," + D_20 + "," + T_20 + "," + R_16 + "," + D_16 + "," + T_16 + ")";
        dbutil.modifyDB(sql);
        System.out.println(sql);


        // response that the report submission is successful
        JSONObject data = new JSONObject();
        try {
            data.put("status", "success");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        response.getWriter().write(data.toString());

    }


    private void queryReport(HttpServletRequest request, HttpServletResponse
            response) throws JSONException, SQLException, IOException {
        DBUtility dbutil = new DBUtility();
        System.out.println(request.getParameter("p_id"));
        String pid = request.getParameter("p_id");
        String sql = "SELECT jsonb_build_object(\n" +
                "    'type',     'FeatureCollection',\n" +
                "    'features', jsonb_agg(features.feature)\n" +
                ")\n" +
                "FROM (\n" +
                "  SELECT jsonb_build_object(\n" +
                "    'type',       'Feature',\n" +
                "    'id',         gid,\n" +
                "    'geometry',   ST_AsGeoJSON(geom)::jsonb,\n" +
                "    'properties', to_jsonb(inputs) - 'gid' - 'geom'\n" +
                "  ) AS feature\n" +
                "  FROM (SELECT * FROM metro_precincts " +
                "  LEFT JOIN precinct_prop ON precinct_prop.p_id = metro_precincts.p_id " +
                "  LEFT JOIN results ON results.p_id = metro_precincts.p_id " +
                "  LEFT JOIN demo ON demo.p_id = metro_precincts.p_id " +
                "  WHERE metro_precincts.p_id=" + pid + ") inputs) features";
        ResultSet res = dbutil.queryDB(sql);
        while (res.next()) {
            String json = res.getString(1);
            response.getWriter().write(json);
        }
    }


}
