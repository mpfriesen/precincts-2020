import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class JDBCDemo {

    public static void main(String[] args) {
        Connection conn;
        Statement stmt;
        try {
            // load the JDBC driver
            Class.forName("org.postgresql.Driver");

            // establish connection
            String url = "jdbc:postgresql://localhost:5432/precincts";
            conn = DriverManager.getConnection(url, "postgres", "");

            // query the database
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
                    "  WHERE metro_precincts.p_id=410512701) inputs) features;";
            stmt = conn.createStatement();
            ResultSet res = stmt.executeQuery(sql);

            // print the result
            if (res != null) {
                while (res.next()) {
                    System.out.println(res.getString(1));
                }
            }

            // clean up
            stmt.close();
            conn.close();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}