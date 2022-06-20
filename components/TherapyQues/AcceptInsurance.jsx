import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTherapistMutation } from '../../store/api/ssmApi';
import Button from '../UI/Button';
import Radio from '../../components/UI/Radio';
import Select from '../UI/MultiSelect';
const data = {
    title: 'Do you accept insurance?',
    name: 'accept_insurance',
    options: [
        {
            label: 'Yes',
            value: true
        },
        {
            label: 'No',
            value: false
        },
    ]
};

    const insA_D = ["1199SEIU", "ACI Specialty Benefits", "Aetna", "Aetna Better Health", "Aetna | Beacon | Cigna | ValueOption", "All Savers", "Ambetter", "American Behavioral", "Amerigroup", "AmeriHealth", "Anthem", "ASR Health Benefits", "Assurant", "Beacon", "Behavioral Health Systems", "Blue Care Network", "Blue Cross", "Blue Cross Blue Shield", "Blue Shield", "Capital Blue Cross", "CareFirst", "CareSource", "Cenpatico", "Ceridian", "Cigna", "Cigna EAP", "Cofinity", "Community Health Choice", "ComPsych", "ComPsych EAP", "Core Source", "Corphealth", "Coventry"]
    const insE_H = ["Empire Blue Cross", "E4 Health EAP", "Fidalis Care", "First Choice Health EAP", "First Choice Health Network", "First Health", "GEHA", "Geisinger Health Plan", "Great-West Life", "Health Alliance", "Health Choice", "Health First", "Health Net", "Healthcare Highways Plus", "Healthlink", "Healthy Blue", "Highmark", "Horizon Healthcare", "Humana", "Husky"];
    const insI_N = ["Impact EAP", "Inland Empire Health Plan (IEHP)", "Integris Health Network", "Johns Hopkins EHP", "Johns Hopkins US Family Health Plan", "Kaiser", "Lifesync", "Lifeworks/Ceridian EAP", "Louisiana Healthcare Connections", "Loveland Foundation Voucher", "Lyra Health", "Magellan Behavioral Health", "Magellan Behavioral Health EAP", "Magna Care Direct Plus", "McLaren", "Medicaid", "Medical Mutual", "Medicare", "Meridian", "MHN", "MHNet Behavioral Health", "Military One Source", "Molina", "Multiplan", "Mutual Health Services", "New Directions"];
    const insO_T = ["Oklahoma Health Network", "Optima", "Optum", "Oscar", "Out of Network Provider", "Oxford", "Paramount-Medicaid", "Peach State Health Plan", "PHCS", "Physicians Health Plan", "Premera Blue Cross", "QualChoice", "Quest Behavioral Health", "Reach EAP", "Regence Blue Shield", "Scott 7 White", "Self Pay", "Sliding Scale Offered", "Tricare", "Trihealth EAP"];
    const insU_Z = ["UHC", "UHC Student Resources", "UMR", "United Healthcare", "UPMC", "Value Options", "WebTPA", "WellCare", "Wellspan Employee Assistance Program", "Wellspring EAP"];


const AcceptInsurance = ({ step, setStep, profile }) => {

    const { register, handleSubmit, control, watch, formState: { errors} } = useForm({defaultValues: { accept_insurance: profile?.accept_insurance}});
    const [updateTherapist, { isSucces, isLoading, isError, error }] = useUpdateTherapistMutation();

    const handleNext = async (data) => {

        const { accept_insurance } = data;
        if(!accept_insurance) return;
        await updateTherapist({ id: profile?.id, accept_insurance, registration_status: 'entered-accept_insurance' });
        setStep(step + 1);

    };

    const handleBack = () => {

        setStep(step - 1);

    };

    
    return (
        <>
            <form id="accept_insurance-form" onSubmit={handleSubmit(handleNext)} className="">
                <div className="md:flex justify-start">
                    <div className="form-control w-full max-w-xs">
                        <Radio control={control} rules={{required: 'This field is requuired.'}} data={data} />
                    </div>
                    {
                        watch('accept_insurance') && (
                            <div className="text-left">
                                <h1 className=" text-lg my-2">Which insurance plans do you accept?</h1>
                                <div className="space-y-5">
                                    {
                                        <div className="">
                                            <Select control={control} data={{name: 'acceptable_insurances', options: insA_D.map(v=> ({label: v, value: v.trim()}))}} />
                                        </div>
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </form>
            <div className={`flex gap-5 py-5 mt-9`}>
                <Button 
                    title={'Back'} 
                    onClick={handleBack}
                    btnQnr
                    btnSecondary
                    />
                <Button 
                    title={'Next'} 
                    form="accept_insurance-form"
                    btnQnr
                    disabled={!watch('accept_insurance')} />
            </div>
        </>
    )
}

export default AcceptInsurance;