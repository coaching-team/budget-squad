import React from 'react';
import BudgetAtAGlance from './BudgetAtAGlanceWidget';

/**
 * The home page of the app with helpful widgets
 *
 * @component
 * @example
 * <Home />
 */
export default function HomePage() {
  return (
    <div>
      HOME PAGE UNDER CONSTRUCTION
      <BudgetAtAGlance testDate={new Date('03-05-2022')} />
    </div>
  );
}
