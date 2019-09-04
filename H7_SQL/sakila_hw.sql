-- SHOW DATABASES;
USE sakila;
SHOW TABLES;

-- 1a. Display the first and last names of all actors from the table `actor`
DESC actor;
SELECT first_name,last_name
FROM actor;

--  1b. Display the first and last name of each actor in a single column in upper case letters. 
-- Name the column `Actor Name`.
SELECT CONCAT(first_name," ", last_name) AS `Actor Name`
FROM actor;

-- 2a. You need to find the ID number, first name, and last name of an actor, 
-- of whom you know only the first name, "Joe." 
-- What is one query would you use to obtain this information?
SELECT actor_id, first_name, last_name
FROM actor
WHERE first_name ="JOE";

-- 2b. Find all actors whose last name contain the letters `GEN`:
SELECT first_name,last_name
FROM actor
WHERE last_name LIKE "%GEN%";

-- 2c. Find all actors whose last names contain the letters `LI`. 
-- This time, order the rows by last name and first name, in that order:
SELECT last_name,first_name
FROM actor
WHERE last_name LIKE "%LI%" 
ORDER BY last_name;

-- 2d. Using `IN`, display the `country_id` and `country` columns of the following countries: 
-- Afghanistan, Bangladesh, and China:
DESC country;
SELECT country_id, country
FROM country
WHERE country IN ("Afghanistan", "Bangladesh", "China");

-- 3a. You want to keep a description of each actor. 
-- You don't think you will be performing queries on a description,
-- so create a column in the table `actor` named `description` 
-- and use the data type `BLOB` (Make sure to research the type `BLOB`, 
-- as the difference between it and `VARCHAR` are significant).
ALTER TABLE actor
ADD `description` BLOB NOT NULL;
-- 3b. Very quickly you realize that entering descriptions for each actor is too much effort. 
-- Delete the `description` column.
ALTER TABLE actor
DROP `description`;

-- 4a. List the last names of actors, as well as how many actors have that last name.
SELECT last_name
FROM actor;

SELECT COUNT(last_name)
FROM actor;

-- 4b. List last names of actors and the number of actors who have that last name, 
-- but only for names that are shared by at least two actors
SELECT last_name, COUNT(*) AS number_actor
FROM actor
GROUP BY last_name
HAVING number_actor > 1;

-- 4c. The actor `HARPO WILLIAMS` was accidentally entered in the `actor` table as `GROUCHO WILLIAMS`. 
-- Write a query to fix the record.
UPDATE actor
SET first_name = "HARPO"
WHERE first_name ="GROUCHO" AND last_name ="WILLIAMS";

-- 4d. Perhaps we were too hasty in changing `GROUCHO` to `HARPO`. 
-- It turns out that `GROUCHO` was the correct name after all! In a single query, 
-- if the first name of the actor is currently `HARPO`, change it to `GROUCHO`.
UPDATE actor
SET first_name = "GROUCHO"
WHERE first_name ="HARPO" AND last_name ="WILLIAMS";

-- 5a. You cannot locate the schema of the `address` table. Which query would you use to re-create it?
SHOW CREATE TABLE address;

-- 6a. Use `JOIN` to display the first and last names, as well as the address, of each staff member. 
-- Use the tables `staff` and `address`:
DESC address;
DESC staff;
SELECT s.first_name, s.last_name, a.address
FROM staff s
JOIN address a USING (address_id);

-- 6b. Use `JOIN` to display the total amount rung up by each staff member in August of 2005. 
-- Use tables `staff` and `payment`.
DESC payment;
SELECT s.first_name, s.last_name, SUM(p.amount) AS total_amount
FROM staff s
JOIN payment p USING(staff_id)
GROUP BY first_name;

-- 6c. List each film and the number of actors who are listed for that film. 
-- Use tables `film_actor` and `film`. Use inner join.
SELECT f.title, COUNT(fa.actor_id) AS count_actor
FROM film f
JOIN film_actor fa USING (film_id)
GROUP BY title;

-- 6d. How many copies of the film `Hunchback Impossible` exist in the inventory system?
SELECT title, COUNT(i.inventory_id) AS number_copies
FROM film f
JOIN inventory i USING(film_id)
WHERE title ="Hunchback Impossible";

-- 6e. Using the tables `payment` and `customer` and the `JOIN` command, 
-- list the total paid by each customer. List the customers alphabetically by last name:
SELECT c.first_name, c.last_name, SUM(p.amount) AS total_amount_paid
FROM customer c
JOIN payment p USING(customer_id)
GROUP BY last_name
ORDER BY last_name ASC;

-- 7a. The music of Queen and Kris Kristofferson have seen an unlikely resurgence. 
-- As an unintended consequence, films starting with the letters `K` and `Q` have also soared in popularity. 
-- Use subqueries to display the titles of movies starting with the letters `K` and `Q` whose language is English.
SELECT title
FROM film
WHERE title LIKE "K%" OR title LIKE "Q%" AND language_id IN (
    SELECT language_id
 	FROM language
 	WHERE name = "English"
    );

-- 7b. Use subqueries to display all actors who appear in the film `Alone Trip`.
 SELECT first_name, last_name
 FROM actor
 WHERE actor_id IN (
	SELECT actor_id
	FROM film_actor
 	WHERE film_id IN (
 		SELECT film_id
 		FROM film
 		WHERE title = "Alone Trip"
     )
 
 );

-- 7c. You want to run an email marketing campaign in Canada, for which you will need the names and 
-- email addresses of all Canadian customers. Use joins to retrieve this information.
SELECT c.first_name, c.last_name,c.email
FROM customer c
JOIN address a USING(address_id)
JOIN city ci USING(city_id)
JOIN country cy USING(country_id)
WHERE country ="Canada"; 

SELECT

-- 7d. Sales have been lagging among young families, and you wish to target all family movies for a promotion. 
-- Identify all movies categorized as _family_ films.
SELECT title
FROM film f
JOIN film_category fc USING (film_id)
JOIN category ca USING (category_id)
WHERE name = "Family"; 

-- 7e. Display the most frequently rented movies in descending order.
CREATE VIEW inventory_rented AS
SELECT inventory_id, COUNT(rental_id) AS number_rented
FROM rental
GROUP BY inventory_id; 

SELECT f.title, SUM(ir.number_rented) AS sum_rented
FROM film f
JOIN inventory i USING (film_id)
JOIN inventory_rented ir USING (inventory_id)
GROUP BY f.title
ORDER BY sum_rented DESC;

--7f. Write a query to display how much business, in dollars, each store brought in.
SELECT store_id, SUM(amount) AS total_revenue
FROM payment p
JOIN customer cu on (p.customer_id=cu.customer_id)
GROUP BY store_id;

-- 7g. Write a query to display for each store its store ID, city, and country.
SELECT s.store_id, ci.city, co.country
FROM store s
JOIN address a on (s.address_id=a.address_id)
JOIN city ci USING (city_id)
JOIN country co USING (country_id);

-- 7h. List the top five genres in gross revenue in descending order. 
-- (**Hint**: you may need to use the following tables: category, film_category, 
-- inventory, payment, and rental.)
SELECT ca.name, SUM(p.amount) AS total_revenue
FROM payment p
JOIN rental r USING (rental_id)
JOIN inventory i USING (inventory_id)
JOIN film_category fc USING (film_id)
JOIN category ca USING (category_id)
GROUP BY ca.name
ORDER BY total_revenue DESC LIMIT 5;

--  8a. In your new role as an executive, 
-- you would like to have an easy way of viewing the 
-- Top five genres by gross revenue. Use the solution from the problem above 
-- to create a view. If you haven't solved 7h, 
-- you can substitute another query to create a view.
CREATE VIEW genre_total_revenue AS

-- b. How would you display the view that you created in 8a?
SELECT *
FROM genre_total_revenue;

-- 8c. You find that you no longer need the view 
-- `top_five_genres`. Write a query to delete it
DROP VIEW genre_total_revenue;
