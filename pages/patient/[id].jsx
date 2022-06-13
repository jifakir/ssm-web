import { useRouter } from 'next/router';
import React from 'react';
import { useFetchTherapistQuery } from '../../store/api/ssmApi';


const TestDynamic = () => {

    const router = useRouter();
    const { id } = router.query;
    const {data} = useFetchTherapistQuery();
    console.log(data);

    return (
        <div className="min-h-72 h-72">
            Daynamic Page is Working...
            <h1 className="text-5xl text-primary font-sterio text-center">
                {id}
            </h1>
        </div>
    )
}

export default TestDynamic;