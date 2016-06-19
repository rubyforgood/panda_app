# Preview all emails at http://localhost:3000/rails/mailers/export_mailer
class ExportMailerPreview < ActionMailer::Preview
  def export_email_preview
    ExportMailer.export_email(User.first)
  end
end
