# Trending-Products-Page

This project takes in a list of orders, determines the products purchased for each order. Then, it returns the products based on its trending order, which is calculated by an algorithm that I designed. The algorithm takes into factor both the popularity and the recency of the products purchased. It returns the products in a set of 10s to enable returning the result while still processing and handling rest of the data, which could be large.

When rendering the results, the page renders lazily and scroll infinitely, which means that it will only render more results when needed. This approach would enable people that has wifi problem to still be able to view the content. 
