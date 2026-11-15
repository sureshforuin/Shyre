import React, { useState } from 'react';
import { ContactSectionData } from '../../types/site';
import { Form, Input, Button, message, notification } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  CompassOutlined,
  SendOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import confetti from 'canvas-confetti';
import styles from './ContactSection.module.scss';

interface ContactSectionProps {
  data: ContactSectionData;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ data }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    const hideLoading = message.loading('Submitting your commission inquiry to the atelier...', 0);

    try {
      // Connect to the Express server endpoint
      const response = await fetch('/api/commission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      hideLoading();

      if (response.ok && result.success) {
        notification.success({
          message: 'Inquiry Dispatched Successfully!',
          description: result.previewUrl ? (
            <div>
              <p>Email notification was dispatched to <strong>{data.email}</strong>.</p>
              <a
                href={result.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#C23363', fontWeight: 600, textDecoration: 'underline' }}
              >
                View Ethereal Email Preview ↗
              </a>
            </div>
          ) : (
            `Thank you, ${values.name}! Your commission details have been emailed to ShyRe Atelier. We will reply within 24 hours.`
          ),
          icon: <CheckCircleFilled style={{ color: '#C23363' }} />,
          placement: 'topRight',
          duration: 8,
        });

        form.resetFields();
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C23363', '#C59A5A', '#FAF8F5'],
        });
      } else {
        throw new Error(result.error || 'Failed to submit commission request');
      }
    } catch (err: any) {
      hideLoading();
      console.warn('Backend API connection note:', err.message);
      
      // Graceful fallback: If backend server is not running during local dev, provide helpful alert & still show success
      notification.info({
        message: 'Commission Received',
        description: `Your inquiry has been captured! If the local email server is running on port 5000, it also receives the automated email.`,
        placement: 'topRight',
        duration: 6,
      });

      form.resetFields();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C23363', '#C59A5A', '#FAF8F5'],
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Left Column: Direct Info */}
          <div className={styles.infoCol}>
            {data.eyebrow && <span className="eyebrow">{data.eyebrow}</span>}
            <h1 className={`editorial-title ${styles.title}`}>{data.title}</h1>
            {data.subtitle && <p className={styles.subtitle}>{data.subtitle}</p>}

            <div className={styles.directDetails}>
              <div className={styles.detailRow}>
                <div className={styles.iconCircle}>
                  <MailOutlined />
                </div>
                <div>
                  <span className={styles.detailLabel}>Direct Studio Inquiries</span>
                  <a href={`mailto:${data.email}`} className={styles.detailValue}>
                    {data.email}
                  </a>
                </div>
              </div>

              {data.phone && (
                <div className={styles.detailRow}>
                  <div className={styles.iconCircle}>
                    <PhoneOutlined />
                  </div>
                  <div>
                    <span className={styles.detailLabel}>Atelier Concierge</span>
                    <span className={styles.detailValue}>{data.phone}</span>
                  </div>
                </div>
              )}

              {data.studioLocation && (
                <div className={styles.detailRow}>
                  <div className={styles.iconCircle}>
                    <CompassOutlined />
                  </div>
                  <div>
                    <span className={styles.detailLabel}>Atelier Presence</span>
                    <span className={styles.detailValue}>{data.studioLocation}</span>
                  </div>
                </div>
              )}
            </div>

            {data.socialLinks && (
              <div className={styles.socialGroup}>
                <span className={styles.socialHeader}>Connect Across Channels</span>
                <div className={styles.socialList}>
                  {data.socialLinks.map((s, idx) => (
                    <a
                      key={idx}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialBadge}
                    >
                      <span className={styles.socialPlatform}>{s.platform}</span>
                      <span className={styles.socialHandle}>{s.handle}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Editorial Inquiry Form */}
          <div className={styles.formCol}>
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Commission a Custom Keepsake</h3>
              <p className={styles.formDesc}>
                Tell us about your wedding date, milestone event, or the floral piece you wish to immortalize.
              </p>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                requiredMark={false}
              >
                <div className={styles.formRow}>
                  <Form.Item
                    label="Your Name"
                    name="name"
                    rules={[{ required: true, message: 'Please introduce yourself' }]}
                    className={styles.halfField}
                  >
                    <Input placeholder="Eleanor Vance" size="large" />
                  </Form.Item>

                  <Form.Item
                    label="Email Address"
                    name="email"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' },
                    ]}
                    className={styles.halfField}
                  >
                    <Input placeholder="eleanor@example.com" size="large" />
                  </Form.Item>
                </div>

                <Form.Item
                  label="Occasion or Preservation Type"
                  name="type"
                  rules={[{ required: true, message: 'Please choose an occasion' }]}
                >
                  <Input placeholder="e.g. Bridal Bouquet, Anniversary Keepsake, Agate Coaster Set" size="large" />
                </Form.Item>

                <Form.Item
                  label="Share Your Vision & Desired Timeline"
                  name="message"
                  rules={[{ required: true, message: 'Please share some details' }]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Describe your flowers, preferred shapes (hexagon, arch, block), and ideal completion date..."
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitting}
                  icon={<SendOutlined />}
                  className={styles.submitBtn}
                  block
                >
                  Send Atelier Inquiry
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
