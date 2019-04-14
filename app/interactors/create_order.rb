class CreateOrder
  include Interactor

  def call
    context.user ||= User.new(user_params)

    context.order = context.user.orders.build(context.order_params)
    if context.user.save
      context.order.line_items << context.cart.line_items
      context.order.calculate_total_price
      context.order.line_items.each {|l| l.update(cart_id: nil)}
      context.order.phone ||= context.user.phone

      context.order.reload
    else
      context.fail!(errors: context.user.errors.messages)
    end
  end

  private

  def user_params
    context.user_params.merge(
      password: SecureRandom.hex(16), # initial password
      phone: context.order_params[:phone]
    )
  end
end
