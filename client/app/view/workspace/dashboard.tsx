import data from "../../mock/dashboard.json"
import { Suspense, lazy } from 'react';

const SectionCards = lazy( () => import( "../../components/section-cards" ) );
const ChartAreaInteractive = lazy( () => import( "../../components/chart-area-interactive" ) );
const DataTable = lazy( () => import( "../../components/data-table" ) );

export default function Dashboard () {

    return <Suspense fallback={ <div>Loading...</div> }>
        <SectionCards />

        <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
        </div>

        <DataTable data={ data } />
    </Suspense>
}