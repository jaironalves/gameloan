using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameLoan.Domain.Entities;
using GameLoan.Domain.Repository;
using GameLoan.Domain.Repository.UnitOfWork;

namespace GameLoan.Domain.Services
{
    public class FriendService
    {
        private readonly IUnitOfWorkFactory _unitOfWorkFactory;

        public FriendService(IUnitOfWorkFactory unitOfWorkFactory)
        {
            _unitOfWorkFactory = unitOfWorkFactory;
        }

        public Task<IEnumerable<Friend>> GetAllAsync()
        {
            using var unitOfWork = _unitOfWorkFactory.CreateNew();
            var friendRepository = unitOfWork.Repository<IFriendRepository>();
            return friendRepository.GetAllAsync();
        }

        public async Task<Friend> AddAsync(Friend friend)
        {
            using var unitOfWork = _unitOfWorkFactory.CreateNew();
            var friendRepository = unitOfWork.Repository<IFriendRepository>();
            friend.Id = Guid.NewGuid();
            friendRepository.Add(friend);
            await unitOfWork.CommitAsync();
            return friend;
        }

        public async Task<Friend> GetAsync(Guid friendId)
        {
            using var unitOfWork = _unitOfWorkFactory.CreateNew();
            var friendRepository = unitOfWork.Repository<IFriendRepository>();
            return await friendRepository.GetByKeyAsync(friendId);
        }

        public async Task UpdateAsync(Friend friend)
        {
            using var unitOfWork = _unitOfWorkFactory.CreateNew();
            var friendRepository = unitOfWork.Repository<IFriendRepository>();
            friendRepository.Update(friend.Id, friend);
            await unitOfWork.CommitAsync();
        }

        public async Task RemoveAsync(Friend friend)
        {
            using var unitOfWork = _unitOfWorkFactory.CreateNew();
            var friendRepository = unitOfWork.Repository<IFriendRepository>();
            friendRepository.Remove(friend.Id);
            await unitOfWork.CommitAsync();
        }
    }
}