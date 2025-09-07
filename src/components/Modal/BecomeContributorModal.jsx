import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';

const BecomeContributorModal = ({ isOpen, setIsOpen, closeModal, handleUpdateStatus }) => {
    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Become a Contributor</DialogTitle>
                    <DialogDescription>
                        Thank you for your interest! You can support us by contributing.
                    </DialogDescription>
                </DialogHeader>
                <hr className='mt-8' />
                <div className='flex justify-between p-6 items-center'>
                    <button
                        onClick={handleUpdateStatus}
                        className='px-2 py-1 rounded-lg bg-green-400 hover:bg-green-600 cursor-pointer'
                    >
                        Send request</button>
                    <button
                        onClick={closeModal}
                        className='px-2 py-1 rounded-lg bg-rose-400 hover:bg-red-500 cursor-pointer'
                    >
                        Close modal</button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BecomeContributorModal;