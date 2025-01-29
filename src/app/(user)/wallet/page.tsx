/**
 * Account page component
 * @file User account page with profile information and social account connections
 */
import { Metadata } from 'next';

// import { AccountContent } from './account-content';
// import { AccountSidebar } from './account-sidebar';
import { AccountContent } from './account-content';

export const metadata: Metadata = {
  title: 'Account',
  description: 'A place to manage your account and settings',
};

export default function AccountPage() {
  return (
    <div className="flex flex-col overflow-hidden">
      <AccountContent />
    </div>
  );
}
