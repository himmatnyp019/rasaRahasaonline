import React, { use, useEffect } from 'react'
import './policy.css'
import { useTranslation } from 'react-i18next';
import { StoreContext } from '../../context/StoreContext';

const Policies = () => {
const {showPolicies, setShowPolicies} = React.useContext(StoreContext);
    const { t } = useTranslation();
    useEffect(() => {
    console.log(showPolicies);
    
    }, [showPolicies]);
    return (
        <div className="policies-container" style={{ display: showPolicies ? 'flex' : 'none' }}>
            <div className="policies-content-main">
                <div className='close-policy-btn' onClick={() => setShowPolicies(false)}>X</div>
                <br />
                <div className="policies-button-box">
                    <h1>Policies</h1>
                    <ul>
                        <li><a href="../../public/docs/privacypolicy.html" target="_blank" rel="noopener noreferrer">{t("privacyPolicy")}</a></li>
                        <li><a href="../../public/docs/termsofuse.html" target='_blank'>{t("termsOfUse")}</a></li>
                        <li><a href="../../public/docs/violation.html" target='_blank' rel='noopener noreferrer'>{t("guidelinesViolationPolicy")}</a></li>
                        <li><a href="../../public/docs/generalprovision.html" target='_blank' rel='noopener noreferrer'>{t("generalProvisions")}</a></li>
                        <li><a href="../../public/docs/refundpolicy.html" target='_blank' rel='noopener noreferrer'>{t("refundPolicy")}</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Policies
