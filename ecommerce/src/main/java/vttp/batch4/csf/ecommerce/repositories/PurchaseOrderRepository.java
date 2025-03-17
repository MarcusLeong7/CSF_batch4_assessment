package vttp.batch4.csf.ecommerce.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;
import static vttp.batch4.csf.ecommerce.repositories.Queries.*;

@Repository
public class PurchaseOrderRepository {

    @Autowired
    private JdbcTemplate template;

    // IMPORTANT: DO NOT MODIFY THIS METHOD.
    // If this method is changed, any assessment task relying on this method will
    // not be marked
    // You may only add Exception to the method's signature
    public void create(Order order) {
        // TODO Task 3{
        // Insert into orders table
        template.update(
                SQL_INSERT_ORDER,
                order.getOrderId(),
                order.getDate(),
                order.getName(),
                order.getAddress(),
                order.isPriority(),
                order.getComments()
        );

        // Insert each line item into the line_items table
        for (LineItem item : order.getCart().getLineItems()) {
            template.update(
                    SQL_INSERT_LINE_ITEMS,
                    order.getOrderId(),
                    item.getProductId(),
                    item.getName(),
                    item.getPrice(),
                    item.getQuantity()
            );
        }
    }
}
