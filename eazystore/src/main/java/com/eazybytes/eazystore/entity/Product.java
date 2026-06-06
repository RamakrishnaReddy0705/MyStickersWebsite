package com.eazybytes.eazystore.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;
@Setter
@Getter
@Entity
@Table(name="products")
public class Product extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="product_id",nullable = false)
  private Long productId;
    @Column(name="name",nullable = false)
  private String name;
    @Column(name="description",nullable = false)
  private String description;
    @Column(name="price",nullable = false)
  private BigDecimal price;
    @Column(name="popularity",nullable = false)
  private Integer popularity;
    @Column(name="image_url")
  private String imageUrl;
  /*  @Column(name="created_at",nullable = false)
  private Instant createdAt;
    @Column(name="created_by",nullable = false)
  private String createdBy;
    @Column(name="updated_at")
  private Instant updatedAt;
    @Column(name="updated_by")
  private String updatedBy;*/

}
