import React from 'react';
import type { CreateUserDTO } from '../../../domain/dto/CreateUserDTO';
import type { UpdateUserDTO } from '../../../domain/dto/UpdateUserDTO';
import { Toast, ConfirmModal } from '../../../../../shared/presentation/components';
import { DashboardHeader, DashboardError, StatsCards, UserChart } from '../presentation/dashboard';
import { UserTableContainer } from './UserTableContainer';
import { UserFormContainer } from './UserFormContainer';
import { useGetUsers } from '../../hooks/useGetUsers';
import { useCreateUser } from '../../hooks/useCreateUser';
import { useUpdateUser } from '../../hooks/useUpdateUser';
import { useDeleteUser } from '../../hooks/useDeleteUser';
import { useStats } from '../../../../stats/presentation/hooks/useStats';
import { useDashboard } from '../../hooks/useDashboard';
import { useToast } from '../../../../../shared/presentation/hooks/useToast';

/**
 * Dashboard container component managing the main application view
 * @returns {JSX.Element} Dashboard container
 */
export const DashboardContainer: React.FC = () => {
  const { users, loading: usersLoading, error: usersError, refetch: refetchUsers } = useGetUsers();
  const { stats, loading: statsLoading, refetch: refetchStats } = useStats();
  const { createUser } = useCreateUser();
  const { updateUser } = useUpdateUser();
  const { deleteUser } = useDeleteUser();
  const { toasts, hideToast, success, error } = useToast();

  const {
    isFormOpen,
    editingUser,
    formMode,
    isDeleteModalOpen,
    userToDelete,
    handleEditUser,
    handleDeleteUser,
    handleCloseForm,
    setIsDeleteModalOpen,
    setUserToDelete,
    handleCreateUser
  } = useDashboard();

  const confirmDeleteUser = async () => {
    if (userToDelete) {
      const deleted = await deleteUser(userToDelete.id);
      if (deleted) {
        await refetchUsers();
        await refetchStats();
        success('User deleted successfully');
      } else {
        error('Failed to delete user');
      }
      setUserToDelete(null);
    }
  };

  const handleFormSubmit = async (userData: CreateUserDTO | UpdateUserDTO) => {
    if (formMode === 'create') {
      const user = await createUser(userData as CreateUserDTO);
      if (user) {
        await refetchUsers();
        await refetchStats();
        success('User created successfully');
      }
    } else if (editingUser) {
      const user = await updateUser(editingUser.id, userData as UpdateUserDTO);
      if (user) {
        await refetchUsers();
        await refetchStats();
        success('User updated successfully');
      }
    }
  };

  if (usersError && users.length === 0 && !usersLoading) {
    return <DashboardError error={usersError} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <DashboardHeader />

        <div className="space-y-6">
          <StatsCards
            users={users}
            stats={stats}
            loading={usersLoading || statsLoading}
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2">
              <UserChart
                stats={stats}
                loading={statsLoading}
                error={null}
                onRetry={undefined}
              />
            </div>

            <div className="lg:col-span-3">
              <UserTableContainer
                users={users}
                loading={usersLoading}
                onEdit={handleEditUser}
                onDelete={(id) => handleDeleteUser(users, id)}
                onCreate={handleCreateUser}
              />
            </div>
          </div>
        </div>
      </div>

      <UserFormContainer
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        user={editingUser}
        mode={formMode}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteUser}
        title="Delete User"
        message={
          <p className="leading-relaxed">
            Are you sure you want to delete <strong className="font-semibold">{userToDelete?.email}</strong>? This action cannot be undone.
          </p>
        }
        confirmText="Delete"
        variant="danger"
      />

      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </div>
  );
};
