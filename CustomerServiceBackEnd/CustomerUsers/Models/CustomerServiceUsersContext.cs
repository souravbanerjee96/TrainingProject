using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace CustomerUsers.Models
{
    public partial class CustomerServiceUsersContext : DbContext
    {
        public CustomerServiceUsersContext()
        {
        }

        public CustomerServiceUsersContext(DbContextOptions<CustomerServiceUsersContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Admin> Admins { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=CTSDOTNET858;Initial Catalog=CustomerServiceUsers;User ID=sa;Password=pass@word1");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Admin>(entity =>
            {
                entity.ToTable("Admin");

                entity.Property(e => e.AddedDate)
                    .HasColumnType("date")
                    .HasColumnName("addedDate")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.AdminName)
                    .HasMaxLength(50)
                    .HasColumnName("adminName");

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .HasColumnName("password");

                entity.Property(e => e.UserName)
                    .HasMaxLength(50)
                    .HasColumnName("userName");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Address).HasMaxLength(50);

                entity.Property(e => e.ContactPref).HasMaxLength(20);

                entity.Property(e => e.Country).HasMaxLength(20);

                entity.Property(e => e.Dob)
                    .HasMaxLength(50)
                    .HasColumnName("DOB");

                entity.Property(e => e.Email).HasMaxLength(50);

                entity.Property(e => e.FirstName).HasMaxLength(50);

                entity.Property(e => e.LastName).HasMaxLength(50);

                entity.Property(e => e.PanNo)
                    .HasMaxLength(10)
                    .IsFixedLength(true);

                entity.Property(e => e.Password).HasMaxLength(50);

                entity.Property(e => e.PhoneNo)
                    .HasMaxLength(10)
                    .IsFixedLength(true);

                entity.Property(e => e.State).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
