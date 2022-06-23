import React from 'react';
import { useForm } from 'react-hook-form';
import Select from '../UI/MultiSelect';
import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';

const Insurance = ({step, setStep, profile}) => {
    
    const { 
        register, 
        handleSubmit, 
        control, 
        watch, 
        formState: { errors} } = useForm({defaultValues: {licensed_states: profile?.licensed_states || []}});
    
        const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {
        const { licensed_states  } = data;
        console.log(licensed_states);
        await updateTherapist({id: profile?.id, licensed_states, registration_status: 'entered-insurance' });
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };


    const insA_D = ["Alabama",  "Alaska", "Arizona", ];
    const insE_H = ["Empire Blue Cross", "E4 Health EAP", "Fidalis Care", "First Choice Health EAP", "First Choice Health Network", "First Health", "GEHA", "Geisinger Health Plan", "Great-West Life", "Health Alliance", "Health Choice", "Health First", "Health Net", "Healthcare Highways Plus", "Healthlink", "Healthy Blue", "Highmark", "Horizon Healthcare", "Humana", "Husky"];
    const insI_N = ["Impact EAP", "Inland Empire Health Plan (IEHP)", "Integris Health Network", "Johns Hopkins EHP", "Johns Hopkins US Family Health Plan", "Kaiser", "Lifesync", "Lifeworks/Ceridian EAP", "Louisiana Healthcare Connections", "Loveland Foundation Voucher", "Lyra Health", "Magellan Behavioral Health", "Magellan Behavioral Health EAP", "Magna Care Direct Plus", "McLaren", "Medicaid", "Medical Mutual", "Medicare", "Meridian", "MHN", "MHNet Behavioral Health", "Military One Source", "Molina", "Multiplan", "Mutual Health Services", "New Directions"];
    const insO_T = ["Oklahoma Health Network", "Optima", "Optum", "Oscar", "Out of Network Provider", "Oxford", "Paramount-Medicaid", "Peach State Health Plan", "PHCS", "Physicians Health Plan", "Premera Blue Cross", "QualChoice", "Quest Behavioral Health", "Reach EAP", "Regence Blue Shield", "Scott 7 White", "Self Pay", "Sliding Scale Offered", "Tricare", "Trihealth EAP"];
    const insU_Z = ["UHC", "UHC Student Resources", "UMR", "United Healthcare", "UPMC", "Value Options", "WebTPA", "WellCare", "Wellspan Employee Assistance Program", "Wellspring EAP"];
    
    
    return (
        <>
            <form id="state-form" onSubmit={handleSubmit(handleNext)} className="text-sm text-left">
                <h1 className="text-lg my-2">Please select all states where you are licensed to provide counseling</h1>
                <div className="space-y-5">
                    {
                        <div className="w-1/2">
                            <Select control={control} data={{name: 'licensed_states', options: insA_D.map(v=> ({label: v, value: v.trim()}))}} />
                        </div>
                    }
                </div>
            </form>
            <div className={`flex gap-5 py-5 mt-9`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    btnQnr
                    btnSecondary />
                <Button 
                    title={'Next'} 
                    form="state-form" 
                    btnQnr 
                    disabled={watch('licensed_states') == null}
                    />
            </div>
        </>
    )
}

export default Insurance;