import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
// import { useCallback, useEffect, useState } from "react";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [mealsData, setMealsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //ALTERNATIVE SOLUTION

  // const fetchMealsHandler = useCallback(async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch(
  //       "https://react-course-http-69006-default-rtdb.firebaseio.com/meals.json"
  //     );
  //     if (!response.ok) {
  //       throw new Error("Something went wrong");
  //     }
  //     const mealsDataObj = await response.json();
  //     const mealsDataArr = [];
  //     for (const key in mealsDataObj) {
  //       let item = {
  //         id: key,
  //         name: mealsDataObj[key].name,
  //         description: mealsDataObj[key].description,
  //         price: mealsDataObj[key].price,
  //       };
  //       mealsDataArr.push(item);
  //       setMealsData(mealsDataArr);
  //     }
  //   } catch (error) {
  //     setError(error.message);
  //   }

  //   setIsLoading(false);
  // }, []);
  // useEffect(() => {
  //   fetchMealsHandler();
  // }, [fetchMealsHandler]);

  useEffect(() => {
    const fetchMealsHandler = async () => {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        "https://react-course-http-69006-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const mealsDataObj = await response.json();
      const mealsDataArr = [];
      for (const key in mealsDataObj) {
        let item = {
          id: key,
          name: mealsDataObj[key].name,
          description: mealsDataObj[key].description,
          price: mealsDataObj[key].price,
        };
        mealsDataArr.push(item);
        setMealsData(mealsDataArr);
      }

      setIsLoading(false);
    };

    setIsLoading(false);
    fetchMealsHandler().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return <p className={classes["loading-text"]}>Loading...</p>;
  }

  if (!isLoading && error) {
    return <p className={classes["error-text"]}>Something went wrong</p>;
  }

  const mealsList = mealsData.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
