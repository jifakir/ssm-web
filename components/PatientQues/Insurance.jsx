import React from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';


const Insurance = ({step, setStep}) => {
    

    const { register, handleSubmit, watch, formState: { errors} } = useForm();
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        await updateTherapist({ ...data, registration_status: 'entered-insurance' });

        // if(!isSucces){
        //     return
        // }

        setStep(step + 1);

    };

    const handleBack = () => {
        setStep(step - 1);
    };


    const insA_D = ["1199SEIU", "ACI Specialty Benefits", "Aetna", "Aetna Better Health", "Aetna | Beacon | Cigna | ValueOption", "All Savers", "Ambetter", "American Behavioral", "Amerigroup", "AmeriHealth", "Anthem", "ASR Health Benefits", "Assurant", "Beacon", "Behavioral Health Systems", "Blue Care Network", "Blue Cross", "Blue Cross Blue Shield", "Blue Shield", "Capital Blue Cross", "CareFirst", "CareSource", "Cenpatico", "Ceridian", "Cigna", "Cigna EAP", "Cofinity", "Community Health Choice", "ComPsych", "ComPsych EAP", "Core Source", "Corphealth", "Coventry"]
    const insE_H = ["Empire Blue Cross", "E4 Health EAP", "Fidalis Care", "First Choice Health EAP", "First Choice Health Network", "First Health", "GEHA", "Geisinger Health Plan", "Great-West Life", "Health Alliance", "Health Choice", "Health First", "Health Net", "Healthcare Highways Plus", "Healthlink", "Healthy Blue", "Highmark", "Horizon Healthcare", "Humana", "Husky"];
    const insI_N = ["Impact EAP", "Inland Empire Health Plan (IEHP)", "Integris Health Network", "Johns Hopkins EHP", "Johns Hopkins US Family Health Plan", "Kaiser", "Lifesync", "Lifeworks/Ceridian EAP", "Louisiana Healthcare Connections", "Loveland Foundation Voucher", "Lyra Health", "Magellan Behavioral Health", "Magellan Behavioral Health EAP", "Magna Care Direct Plus", "McLaren", "Medicaid", "Medical Mutual", "Medicare", "Meridian", "MHN", "MHNet Behavioral Health", "Military One Source", "Molina", "Multiplan", "Mutual Health Services", "New Directions"];
    const insO_T = ["Oklahoma Health Network", "Optima", "Optum", "Oscar", "Out of Network Provider", "Oxford", "Paramount-Medicaid", "Peach State Health Plan", "PHCS", "Physicians Health Plan", "Premera Blue Cross", "QualChoice", "Quest Behavioral Health", "Reach EAP", "Regence Blue Shield", "Scott 7 White", "Self Pay", "Sliding Scale Offered", "Tricare", "Trihealth EAP"];
    const insU_Z = ["UHC", "UHC Student Resources", "UMR", "United Healthcare", "UPMC", "Value Options", "WebTPA", "WellCare", "Wellspan Employee Assistance Program", "Wellspring EAP"];
    
    return (
        <form onSubmit={handleSubmit(handleNext)} className="text-sm text-left">
            <h1 className="text-lg my-2">Which insurance plans do you accept?</h1>
            <div className="space-y-5">
                <div className="dropdown dropdwon-primary">
                    <label tabIndex="0" className="btn btn-outline w-60 m-1 flex justify-between">
                        <span className="">Insurances A-D</span> 
                        <span className=""><MdArrowDropDown /></span>
                    </label>
                    <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-72">
                        
                        {
                            insA_D.map(v => (
                                <li key={`_insurance${v}`}>
                                    <div className="form-control flex justify-start">
                                        <label className="label block w-full cursor-pointer justify-self-start">
                                            <input {...register('insurance', { required: true })} type="checkbox" className="checkbox checked:checkbox-primary" />
                                            <span className="label-text pl-5">{v}</span>
                                        </label>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="dropdown dropdwon-primary">
                    <label tabIndex="0" className="btn btn-outline w-60 m-1 flex justify-between">
                        <span className="">Insurances E-H</span> 
                        <span className=""><MdArrowDropDown /></span>
                    </label>
                    <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-72">
                        
                        {
                            insE_H.map(v => (
                                <li key={`_insurance${v}`}>
                                    <div className="form-control flex justify-start">
                                        <label className="label block w-full cursor-pointer justify-self-start">
                                            <input {...register('insurance', { required: true })} type="checkbox" className="checkbox checked:checkbox-primary" />
                                            <span className="label-text pl-5">{v}</span>
                                        </label>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="dropdown dropdwon-primary">
                    <label tabIndex="0" className="btn btn-outline w-60 m-1 flex justify-between">
                        <span className="">Insurances I-N</span> 
                        <span className=""><MdArrowDropDown /></span>
                    </label>
                    <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-72">
                        
                        {
                            insI_N.map(v => (
                                <li key={`_insurance${v}`}>
                                    <div className="form-control flex justify-start">
                                        <label className="label block w-full cursor-pointer justify-self-start">
                                            <input {...register('insurance', { required: true })} type="checkbox" className="checkbox checked:checkbox-primary" />
                                            <span className="label-text pl-5">{v}</span>
                                        </label>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="dropdown dropdwon-primary">
                    <label tabIndex="0" className="btn btn-outline w-60 m-1 flex justify-between">
                        <span className="">Insurances O-T</span> 
                        <span className=""><MdArrowDropDown /></span>
                    </label>
                    <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-72">
                        
                        {
                            insO_T.map(v => (
                                <li key={`_insurance${v}`}>
                                    <div className="form-control flex justify-start">
                                        <label className="label block w-full cursor-pointer justify-self-start">
                                            <input {...register('insurance', { required: true })} type="checkbox" className="checkbox checked:checkbox-primary" />
                                            <span className="label-text pl-5">{v}</span>
                                        </label>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="dropdown dropdwon-primary">
                    <label tabIndex="0" className="btn btn-outline w-60 m-1 flex justify-between">
                        <span className="">Insurances U-Z</span> 
                        <span className=""><MdArrowDropDown /></span>
                    </label>
                    <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-72">
                        
                        {
                            insU_Z.map(v => (
                                <li key={`_insurance${v}`}>
                                    <div className="form-control flex justify-start">
                                        <label className="label block w-full cursor-pointer justify-self-start">
                                            <input {...register('insurance', { required: true })} type="checkbox" className="checkbox checked:checkbox-primary" />
                                            <span className="label-text pl-5">{v}</span>
                                        </label>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className={`flex gap-5 py-5`}>
                <button onClick={handleBack} className={`w-28 btn btn-outline btn-primary`}>
                    Back
                </button>
                <button type='submit' className={`w-28 btn text-white ${!watch().insurance || watch().insurance.length === 0 ? 'bg-gray-400' : 'btn-primary'}`} >
                    Next
                </button>
            </div>
        </form>
    )
}

export default Insurance;