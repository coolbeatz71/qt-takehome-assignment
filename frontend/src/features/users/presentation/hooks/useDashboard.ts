import { useState } from 'react';
import type { User } from '../../domain/entities/User.entity';

/**
 * Dashboard hook return value
 * @property {boolean} isFormOpen - Form modal open state
 * @property {User | null} editingUser - User being edited
 * @property {string} formMode - Form mode (create or edit)
 * @property {boolean} isDeleteModalOpen - Delete modal open state
 * @property {User | null} userToDelete - User to delete
 * @property {Function} handleCreateUser - Create user handler
 * @property {Function} handleEditUser - Edit user handler
 * @property {Function} handleDeleteUser - Delete user handler
 * @property {Function} handleCloseForm - Close form handler
 * @property {Function} setIsFormOpen - Set form open state
 * @property {Function} setIsDeleteModalOpen - Set delete modal open state
 * @property {Function} setUserToDelete - Set user to delete
 */
interface UseDashboardReturn {
  isFormOpen: boolean;
  editingUser: User | null;
  formMode: 'create' | 'edit';
  isDeleteModalOpen: boolean;
  userToDelete: User | null;
  handleCreateUser: () => void;
  handleEditUser: (user: User) => void;
  handleDeleteUser: (users: User[], id: number) => void;
  handleCloseForm: () => void;
  setIsFormOpen: (open: boolean) => void;
  setIsDeleteModalOpen: (open: boolean) => void;
  setUserToDelete: (user: User | null) => void;
}

/**
 * Hook for managing dashboard UI state
 * @returns {UseDashboardReturn} Dashboard state and handlers
 */
export const useDashboard = (): UseDashboardReturn => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleCreateUser = () => {
    setEditingUser(null);
    setFormMode('create');
    setIsFormOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormMode('edit');
    setIsFormOpen(true);
  };

  const handleDeleteUser = (users: User[], id: number) => {
    const user = users.find(u => u.id === id);
    if (user) {
      setUserToDelete(user);
      setIsDeleteModalOpen(true);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingUser(null);
  };

  return {
    isFormOpen,
    editingUser,
    formMode,
    isDeleteModalOpen,
    userToDelete,
    handleCreateUser,
    handleEditUser,
    handleDeleteUser,
    handleCloseForm,
    setIsFormOpen,
    setIsDeleteModalOpen,
    setUserToDelete,
  };
};