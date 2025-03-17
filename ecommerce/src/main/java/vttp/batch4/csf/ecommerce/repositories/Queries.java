package vttp.batch4.csf.ecommerce.repositories;

public class Queries {

    // Orders table queries
    public static String SQL_INSERT_ORDER = "insert into orders (order_id,date,name,address,priority,comments) values (?,?,?,?,?,?)";

    // Cart table queries
    public static String SQL_INSERT_LINE_ITEMS = "insert into line_items (order_id, prod_id, name, price, quantity) values (?, ?, ?, ?, ?)";

}
