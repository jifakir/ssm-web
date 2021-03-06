import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { MdAdd, MdDeleteOutline } from 'react-icons/md';
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
        label: '01:30 PM',
        value: '01:30pm',
    },
    {
        label: '02:00 PM',
        value: '02:00pm',
    },
    {
        label: '02:30 PM',
        value: '02:30pm',
    },
    {
        label: '03:00 PM',
        value: '03:00pm',
    },
    {
        label: '03:30 PM',
        value: '03:30pm',
    },
    {
        label: '04:00 PM',
        value: '04:00pm',
    },
    {
        label: '04:30 PM',
        value: '04:30pm',
    },
    {
        label: '05:00 PM',
        value: '05:00pm',
    },
    {
        label: '05:30 PM',
        value: '05:30pm',
    },
    {
        label: '06:00 PM',
        value: '06:00pm',
    },
    {
        label: '06:30 PM',
        value: '06:30pm',
    },
    {
        label: '07:00 PM',
        value: '07:00pm',
    },
    {
        label: '07:30 PM',
        value: '07:30pm',
    },
    {
        label: '08:00 PM',
        value: '08:00pm',
    },
    {
        label: '08:30 PM',
        value: '08:30pm',
    },
    {
        label: '09:00 PM',
        value: '09:00pm',
    },
    {
        label: '09:30 PM',
        value: '09:30pm',
    },
    {
        label: '10:00 PM',
        value: '10:00pm',
    },
    {
        label: '10:30 PM',
        value: '10:30pm',
    },
    {
        label: '11:30 PM',
        value: '11:30pm',
    },
    {
        label: '12:00 PM',
        value: '12:00pm',
    },
    {
        label: '12:30 PM',
        value: '12:30pm',
    },
];


const amTime = [
    {
        label: '01:00 AM',
        value: '01:00am',
    },
    {
        label: '01:30 AM',
        value: '01:30am',
    },
    {
        label: '02:00 AM',
        value: '02:00am',
    },
    {
        label: '02:30 AM',
        value: '02:30am',
    },
    {
        label: '03:00 AM',
        value: '03:00am',
    },
    {
        label: '03:30 AM',
        value: '03:30am',
    },
    {
        label: '04:00 AM',
        value: '04:00am',
    },
    {
        label: '04:30 AM',
        value: '04:30am',
    },
    {
        label: '05:00 AM',
        value: '05:00am',
    },
    {
        label: '05:30 AM',
        value: '05:30am',
    },
    {
        label: '06:00 AM',
        value: '06:00am',
    },
    {
        label: '06:30 AM',
        value: '06:30am',
    },
    {
        label: '07:00 AM',
        value: '07:00am',
    },
    {
        label: '07:30 AM',
        value: '07:30am',
    },
    {
        label: '08:00 AM',
        value: '08:00am',
    },
    {
        label: '08:30 AM',
        value: '08:30am',
    },
    {
        label: '09:00 AM',
        value: '09:00am',
    },
    {
        label: '09:30 AM',
        value: '09:30am',
    },
    {
        label: '10:00 AM',
        value: '10:00am',
    },
    {
        label: '10:30 AM',
        value: '10:30am',
    },
    {
        label: '11:00 AM',
        value: '11:00am',
    },
    {
        label: '11:30 AM',
        value: '11:30am',
    },
    {
        label: '12:00 AM',
        value: '12:00am',
    },
    {
        label: '12:30 AM',
        value: '12:30am',
    },
];


const TestAvail = () => {

    const { control, handleSubmit } = useForm({
        defaultValues: {
            availabilities:[{ 
                day: 'monday',
                start_time: '8:00am',
                end_time: '8:00pm'
            }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'availabilities'
    });
    
    const appendField = () => {
        if(fields.length >= 6) return;
        append({
                day: 'monday',
                start_time: '8:00am',
                end_time: '8:00pm'
        });
    }

    const submit = (data) => console.log(data);

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="flex justify-end mb-2">
                <button type='button' onClick={appendField} className='btn btn-outline btn-primary btn-sm'>
                    <MdAdd className='mr-1 text-lg' /> Add Day
                </button>
            </div>
            <div className="">
                {
                    fields.map((field, idx) => {
                        return (
                            <div key={field.id} className="flex items-center gap-5">
                                <div className=" w-52">
                                        <h3 className={`my-2 ${idx=== 0 ? 'block' : 'hidden'}`}>Day</h3>
                                        <Select 
                                            control={control} 
                                            data={{name: `availabilities.${idx}.day`, options: week}} />
                                    </div>
                                    <div className=" w-40">
                                        <h3 className={`my-2 ${idx=== 0 ? 'block' : 'hidden'}`}>M-Start Time</h3>
                                        <Select 
                                            control={control} 
                                            data={{name: `availabilities.${idx}.start_time`, options: amTime}} />
                                    </div>
                                    <div className=" w-40">
                                        <h3 className={`my-2 ${idx=== 0 ? 'block' : 'hidden'}`}>M-End Time</h3>
                                        <Select 
                                            control={control} 
                                            data={{name: `availabilities.${idx}.end_time`, options: pmTime}} />
                                    </div>
                                    <div onClick={() => remove(idx)} className="w-5 flex items-center">
                                        <MdDeleteOutline className={`cursor-pointer text-secondary hover:text-error mt-3 text-lg ${idx === 0 ? 'hidden' : 'block'}`} />
                                    </div>
                                </div>
                        )
                    })
                }
            </div>
            <button className='my-5'>submit</button>
        </form>
    )
}

export default TestAvail;