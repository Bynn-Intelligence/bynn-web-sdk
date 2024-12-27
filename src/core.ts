import { BynnConfig, BynnParams, FormOptions, BynnSDK } from './types';
import { DEFAULT_HOST } from './constants';
import { createSession } from './api/session';
import { createVerificationForm } from './ui/form';
import { showVerificationModal } from './ui/verification-modal';
import { showErrorModal } from './ui/alerts/error-modal';

// Import styles
import './styles';

export const Bynn = (config: BynnConfig): BynnSDK => {
  const {
    host = DEFAULT_HOST,
    apiKey,
    parentId,
    fields = [],
    onSession,
    i18n
  } = config;

  let params: BynnParams = {
    person: {
      first_name: '',
      last_name: '',
      email_address: ''
    }
  };

  fields.forEach(field => {
    if (field.visible === false && field.value) {
      params.person[field.name] = field.value;
    }
  });

  const setParams = (newParams: Partial<BynnParams>) => {
    params = {
      ...params,
      ...newParams
    };
  };

  const mount = async (options: FormOptions = {}) => {
    const form = createVerificationForm(parentId, params, options, fields);
    
    form.onsubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
      submitBtn.disabled = true;
      submitBtn.textContent = options.loadingText || 'Loading...';

      try {
        const personData = { ...params.person };
        fields.forEach(field => {
          const value = formData.get(field.name)?.toString() || field.value || '';
          personData[field.name] = value;
        });

        const response = await createSession(host, apiKey, {
          person: personData
        }, i18n);
        
        showVerificationModal(response.url);
        
        if (onSession) {
          onSession(null, response);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        showErrorModal(errorMessage);
        
        if (onSession) {
          onSession(error as Error, null);
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = options.submitBtnText || 'Start Verification';
      }
    };
  };

  return {
    params,
    setParams,
    mount
  };
};