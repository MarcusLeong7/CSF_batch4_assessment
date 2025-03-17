package vttp.batch4.csf.ecommerce.controllers;


import jakarta.json.Json;
import jakarta.json.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;

@Controller
@RequestMapping(path="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  @PostMapping(path="/order", consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public ResponseEntity<String> postOrder(@RequestBody Order order) {
    try {
      // Process the order by calling the service
      poSvc.createNewPurchaseOrder(order);

      // Create success response with order ID
      JsonObject resp = Json.createObjectBuilder()
              .add("orderId", order.getOrderId())
              .build();

      // Return 200 status with the order ID
      return ResponseEntity.status(HttpStatus.OK)
              .body(resp.toString());

    } catch (Exception ex) {
      // If there's an error, create error response
      JsonObject errResp = Json.createObjectBuilder()
              .add("message", ex.getMessage())
              .build();

      System.out.println(errResp.toString());

      // Return 400 status with the error message
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
              .body(errResp.toString());
    }
  }
}
