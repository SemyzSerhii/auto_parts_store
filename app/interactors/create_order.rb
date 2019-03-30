class CreateOrder
  include Interactor

  def call
    context.order = Order.new(context.order_params)

    context.order.user = context.user || User.new(user_params)

    context.order.line_items << context.cart.line_items
    context.order.line_items.detach_all
    context.order.calculate_total_price

    if context.order.save
      context.order.reload
    else
      error!(errors: context.order.errors.messages)
    end
  end

  def user_params
    context.user_params.merge(
      password: SecureRandom.hex(16),
      phone: context.order_params[:phone]
    )
  end
end
