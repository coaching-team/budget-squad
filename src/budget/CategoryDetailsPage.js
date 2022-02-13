import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { categoryByIdSelector } from './CategorySlice';

/**
 * Shows the details of the category with the id in the URL, or redirects to the 404 page
 *
 * @component
 * @example
 * <CategoryPage />
 */
export default function CategoryDetailsPage() {
  // React Router
  const navigate = useNavigate();

  // Get the category id from the URL and get the category for that id from the Redux store
  let { categoryId } = useParams();
  categoryId = parseInt(categoryId, 10);
  const category = useSelector(categoryByIdSelector(categoryId));

  // After the inital render, if there isn't a category for the id in the URL, go to the 404 page
  useEffect(() => {
    if (!category) {
      navigate('/notfound');
    }
  }, [category, navigate]);

  // Show the category information, or if there isn't one, an empty <div>
  return (
    (!category) ? <div />
      : (
        <div>
          Category:
          {category.name}
        </div>
      )
  );
}
