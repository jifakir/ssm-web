import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import Button from '../UI/Button';
import Select from '../UI/Select';





const week = [
    {
        label: 'Monday',
        value: 'monday'
    },
    {
        label: 'Tuesday',
        value: 'tuesday'
    },
    {
        label: 'Wednesday',
        value: 'wednesday'
    },
    {
        label: 'Thursday',
        value: 'thursday'
    },
    {
        label: 'Friday',
        value: 'friday'
    },
    {
        label: 'Saturday',
        value: 'saturday'
    },
    {
        label: 'Sunday',
        value: 'sunday'
    },
]


const pmTime = [
    {
        label: '01:00 PM',
        value: '01:00pm',
    },
    {
        label: '02:00 PM',
        value: '02:00pm',
    },
    {
        label: '03:00 PM',
        value: '03:00pm',
    },
    {
        label: '04:00 PM',
        value: '04:00pm',
    },
    {
        label: '05:00 PM',
        value: '05:00pm',
    },
    {
        label: '06:00 PM',
        value: '06:00pm',
    },
    {
        label: '07:00 PM',
        value: '07:00pm',
    },
    {
        label: '08:00 PM',
        value: '08:00pm',
    },
    {
        label: '09:00 PM',
        value: '09:00pm',
    },
    {
        label: '10:00 PM',
        value: '10:00pm',
    },
    {
        label: '11:00 PM',
        value: '11:00pm',
    },
    {
        label: '12:00 PM',
        value: '12:00pm',
    },
];


const amTime = [
    {
        label: '01:00 AM',
        value: '01:00am',
    },
    {
        label: '02:00 AM',
        value: '02:00am',
    },
    {
        label: '03:00 AM',
        value: '03:00am',
    },
    {
        label: '04:00 AM',
        value: '04:00am',
    },
    {
        label: '05:00 AM',
        value: '05:00am',
    },
    {
        label: '06:00 AM',
        value: '06:00am',
    },
    {
        label: '07:00 AM',
        value: '07:00am',
    },
    {
        label: '08:00 AM',
        value: '08:00am',
    },
    {
        label: '09:00 AM',
        value: '09:00am',
    },
    {
        label: '10:00 AM',
        value: '10:00am',
    },
    {
        label: '11:00 AM',
        value: '11:00am',
    },
    {
        label: '12:00 AM',
        value: '12:00am',
    },
];


const TestAvail = () => {

    const {control} = useForm({
        defaultValues: {
            availabilities:[{ 
                day: 'monday',
                start_time: '8am',
                end_time: '8pm'
            }]
        }
    });

    const { fields, append } = useFieldArray({
        control,
        name: 'availabilities'
    });
    
    const appendField = () => {
        if(fields.length >= 6) return;
        append({
                day: 'monday',
                start_time: '8am',
                end_time: '8pm'
        });
    }
    
    return (
        <form className="">
            <div className="flex justify-end mb-2">
                <button type='button' onClick={appendField} className='btn btn-outline btn-secondary btn-sm'>Add Day</button>
            </div>
            <div className="">
                {
                    fields.map((field, idx) => {
                        return (
                            <div key={field.id} className="flex items-center gap-5">
                                <div className=" w-72">
                                        <h3 className="my-2">Day</h3>
                                        <Select 
                                        control={control} data={{name: 'day', options: week}} />
                                    </div>
                                    <div className=" w-40">
                                        <h3 className="my-2">M-End Time</h3>
                                        <Select 
                                        control={control} data={{name: 'start_time', options: amTime}} />
                                    </div>
                                    <div className=" w-40">
                                        <h3 className="my-2">M-End Time</h3>
                                        <Select 
                                        control={control} data={{name: 'end_time', options: pmTime}} />
                                    </div>
                                </div>
                        )
                    })
                }
            </div>
        </form>
    )
}

export default TestAvail;