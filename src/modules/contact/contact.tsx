import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';

import { social } from '@const/social';

import { Angle } from '@components/angle/angle';
import { Button } from '@components/button/button';
import { Icon } from '@components/icon/icon';
import { Select } from '@components/select/select';
import { TextInput } from '@components/text-input/text-input';
import { Translation, useTranslation } from '@components/translation/translation';

import api from '@services/api';

import { selectSettings } from '@store/slices/settings/selectors';
import { selectUser } from '@store/slices/user/selectors';

import tracking, { TrackingEvents } from '@utils/tracking/tracking';

import { Endpoints, Icons } from '@types';

import style from './contact.module.scss';

type OpportunityTypes = 'Contract' | 'Full time';
type OpportunityLengths = '1 month' | '3 months' | '6 months' | '12 months';

export function Contact() {
  const { locale, theme } = useSelector(selectSettings);
  const { email: userEmail, name: userName } = useSelector(selectUser) || {};

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [company, setCompany] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const [opportunityType, setOpportunityType] = useState<OpportunityTypes>('Contract');
  const [opportunityLength, setOpportunityLength] = useState<OpportunityLengths>('3 months');

  const isValid = Boolean((userEmail || email.trim()) && (userName || name.trim()) && message.trim());

  const onSubmit = async () => {
    if (isValid) {
      setLoading(true);
      try {
        api.post(Endpoints.CONTACT, {
          body: {
            company,
            email: userEmail || email,
            message,
            name: userName || name,
            ...(opportunityType === 'Contract' && {
              opportunityLength,
            }),
            opportunityType,
          },
          queries: { locale, theme },
        });
      } finally {
        setLoading(false);
        setMessage('');

        tracking.track(TrackingEvents.CONTACT, { type: opportunityType });
      }
    }
  };

  const {
    'contact.opportunityType.label': opportunityTypeLabel,
    'contact.opportunityLength.label': opportunityLengthLabel,
    'contact.message.placeholder': messagePlaceholder,
    'contact.submit': submitLabel,
  } = useTranslation([
    'contact.opportunityType.label',
    'contact.opportunityLength.label',
    'contact.message.placeholder',
    'contact.submit',
  ]);

  return (
    <section className={style.container} id="contact">
      <h2>
        <Translation id="contact.title" />
      </h2>
      <div className={style.contact}>
        <div>
          <label>
            <p>
              <Translation id="contact.name.label" />
            </p>
            <TextInput
              className={style.contactField}
              disabled={Boolean(userName)}
              icon={userName ? Icons.LOCKED : false}
              onChange={(e) => setName(e.target.value)}
              required
              value={userName || name}
            />
          </label>
          <label>
            <p>
              <Translation id="contact.email.label" />
            </p>
            <TextInput
              className={style.contactField}
              disabled={Boolean(userEmail)}
              icon={userEmail ? Icons.LOCKED : false}
              onChange={(e) => setEmail(e.target.value)}
              value={userEmail || email}
              required
              type="email"
            />
          </label>
          <label>
            <p>
              <Translation id="contact.number.label" />
            </p>
            <TextInput
              className={style.contactField}
              icon={false}
              onChange={(e) => setNumber(e.target.value.replace(/[^\d]+/g, ''))}
              value={number}
              type="tel"
            />
          </label>
          <label>
            <p>
              <Translation id="contact.company.label" />
            </p>
            <TextInput
              className={style.contactField}
              onChange={(e) => setCompany(e.target.value)}
              icon={false}
              value={company}
            />
          </label>
          <Select
            className={style.contactSelect}
            label={opportunityTypeLabel}
            onChange={(e) => setOpportunityType(e.target.value as OpportunityTypes)}
            options={['Contract', 'Full time']}
            selected={opportunityType}
          />
          {opportunityType === 'Contract' && (
            <Select
              className={style.contactSelect}
              label={opportunityLengthLabel}
              options={['1 month', '3 months', '6 months', '12 months']}
              onChange={(e) => setOpportunityLength(e.target.value as OpportunityLengths)}
              selected={opportunityLength}
            />
          )}
        </div>
        <label className={style.contactMessage}>
          <p>
            <Translation id="contact.message.label" />
          </p>
          <Angle>
            <textarea
              className={cx(style.contactField, style.contactFieldMessage)}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              rows={8}
              placeholder={messagePlaceholder}
              required
            />
          </Angle>
        </label>
      </div>
      <Button
        disabled={loading || !isValid}
        icon={<Icon icon={Icons.CONTACT_SUBMIT} size="S" />}
        label={submitLabel}
        onClick={onSubmit}
      />
      <div className={style.social}>
        {social.map(({ icon, name, url }) => (
          <a
            className={style.socialLink}
            href={url}
            key={url}
            onClick={() => tracking.track(TrackingEvents.CLICK, { label: `Visit ${name}` })}
            target="_blank"
            rel="noreferrer"
          >
            <Icon icon={icon} />
          </a>
        ))}
      </div>
    </section>
  );
}
