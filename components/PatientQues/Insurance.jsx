import React from 'react';
import { useForm } from 'react-hook-form';
import Select from '../UI/MultiSelect';
import { useRegisterTherapistMutation, useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../../components/UI/Button';

const Insurance = ({step, setStep, profile}) => {
    
    const { 
        register, 
        handleSubmit, 
        control, 
        watch, 
        formState: { errors} } = useForm({defaultValues: {acceptable_insurances: profile?.acceptable_insurances}});
    
        const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {
        const { acceptable_insurances  } = data;
        console.log(acceptable_insurances);
        await updateTherapist({id: profile?.id, acceptable_insurances, registration_status: 'entered-insurance' });
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
        <>
            <form id="insurance-form" onSubmit={handleSubmit(handleNext)} className="text-sm text-left">
                <h1 className="text-lg my-2">Which insurance plans do you accept?</h1>
                <div className="space-y-5">
                    {
                        <div className="">
                            <Select control={control} data={{name: 'acceptable_insurances', options: insA_D.map(v=> ({label: v, value: v.trim()}))}} />
                        </div>
                    }
                </div>
            </form>
            <div className={`flex gap-5 py-5`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    btnQnr
                    btnSecondary
                    className="btn-outline border-neutral px-8 text-2xl" />
                <Button 
                    title={'Next'} 
                    form="insurance-form" 
                    className={`${isLoading ? 'loading' : ''} px-8 text-2xl ${(!watch().acceptable_insurances || !watch().acceptable_insurances.length) ? 'bg-gray-300 text-black/80 cursor-not-allowed border-gray-300' : 'btn-secondary'}`} />
            </div>
        </>
    )
}

export default Insurance;